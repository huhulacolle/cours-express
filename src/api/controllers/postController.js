const Post = require('../models/postModel');
const axios = require('axios');

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

exports.createAPost = async (req, res) => {
    let body = req.body;
    if (body.content == undefined) {
        loremipsu = await axios.get("https://loripsum.net/api/plaintext");
        body.content = loremipsu.data;
    }
    let newPost = new Post(body);
    newPost.save((error, post) => {
        if (error) {
            res.status(401);
            console.log(error);
            res.json({ message: "Reqûete invalide." });
        }
        else {
            res.status(201);
            res.json(post);
        }
    })
}

exports.getAPost = (req, res) => {
    Post.findById(req.params.post_id, (error, post) => {
        if (error) {
            res.status(401);
            console.log(error);
            res.json({ message: "Reqûete invalide." });
        }
        else {
            res.status(200);
            res.json(post);
        }

    })
}

exports.updateAPost = (req, res) => {
    Post.findByIdAndUpdate(req.params.post_id, req.body, { new: true }, (error, post) => {
        if (error) {
            res.status(401);
            console.log(error);
            res.json({ message: "Reqûete invalide." });
        }
        else {
            res.status(200);
            res.json(post);
        }

    })
}

exports.deleteApost = (req, res) => {
    Post.findByIdAndRemove(req.params.post_id, (error) => {
        if (error) {
            res.status(401);
            console.log(error);
            res.json({ message: "Reqûete invalide." });
        }
        else {
            res.status(200);
            res.json({ message: "Article supprimé" });
        }

    })
}