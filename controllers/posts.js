const Post = require('../models/post');

module.exports = (app) => {
  app.post("/posts/new", (req, res) => {
    const post = new Post(req.body);

    post.save((err, post) => {
        console.log(err);
        console.log(post);
        return res.redirect(`/`);
    })
  });
  //Index
    app.get("/", (req, res) => {
      Post.find({})
      .then(posts => {
          res.render("posts-index", {posts});
      })
      .catch(err => {
          console.log('error', err.message);
      });
  });
    // app.get("/posts/new", (req, res) => {
    //   const comments = new Comment(req.body);
    //   comments.save((err, comments) => {
    //     console.log(err);
    //     console.log(comments);
    //     return res.redirect(`/`)
    //   })
    // })
  // CREATE

    
    app.get("/posts/:id", function(req, res) {
        // LOOK UP THE POST
        Post.findById(req.params.id).populate('comments').then((post) => {
          res.render('post-show', { post })
          })
          .catch((err) => {
            console.log(err.message)
          })
    });
      // SUBREDDIT
    app.get("/n/:subreddit", function(req, res) {
      Post.find({ subreddit: req.params.subreddit })
        .then(posts => {
          res.render("posts-index", { posts });
        })
        .catch(err => {
          console.log(err);
        });
    });
};