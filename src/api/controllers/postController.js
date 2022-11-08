const Post = require('../models/postModel');

exports.listAllPosts = (req, res) => {
    Post.find({}, (error, posts) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({ message: "Erreur serveur." });
        }
        else {
            res.status(200);
            res.json(posts);
        }
    })
}

exports.createAPost = (req, res) => {
    let newPost = new Post(req.body);

    newPost.save((error, post) => {
        if (error) {
            res.status(401);
            console.log(error);
            res.json({ message: "Requete invalide." });
        }
        else {
            res.status(201);
            res.json({post});
        }
    })
}

exports.getAPost = async (req, res) => {
    try {
        const result = await Post.findById({_id: req.params.post_id}).exec();
        if (result == null) {
            return res.status(400).send();    
        }
        return res.json(result);
    } catch (error) {
        return res.status(400).send("Erreur")
    }
}

exports.updateAPost = async (req, res) => {
    try {
        await Post.findByIdAndUpdate({_id: req.params.post_id}, {title: req.body.title, content: req.body.content}).exec();
        return res.status(201).send();
    } catch (error) {
        return res.status(400).send("Erreur");
    }
}

exports.deleteApost = async (req, res) => {
    try {
        await Post.findOneAndDelete({_id: req.params.post_id}).exec();
        return res.send();
    } catch (error) {
        return res.status(400).send("Erreur");
    }
}