const Post = require('../models/post');

module.exports = app => {
  // CREATE
    app.post("/posts/new", (req, res) => {
        const post = new Post(req.body);

        post.save((err, post) => {
            console.log(err);
            console.log(post);
            return res.redirect(`/`);
        })
    });
    app.get("/", (req, res) => {
        Post.find({})
        .then(posts => {
            res.render("posts-index", {posts});
        })
        .catch(err => {
            console.log('error', err.message);
        });
    });
};