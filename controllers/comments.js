const Post = require('../models/post');
const Comment = require('../models/comments');
const User = require('../models/user');

module.exports = function(app) {

    // CREATE Comment
    app.post("/posts/:postId/comments", function(req, res) {
        // INSTANTIATE INSTANCE OF MODEL
        const comment = new Comment(req.body);
        comment.author = req.user._id;
        // SAVE INSTANCE OF Comment MODEL TO DB
        comment
            .save()
            .then(comment => {
                return Promise.all([
                    Post.findById(req.params.postId)
                ]);
            })
            .then(([post, user]) => {
                post.comments.unshift(comment);
                return Promise.all([
                  post.save()
                ]);
            })
            .then(post => {
                post.comments.unshift(comment);
                return post.save();

            })
            .then(post => {
                res.redirect(`/posts/${req.params.postId}`);
            })
            .catch(err => {
                console.log(err);
            });
    });
}





































// const Post = require('../models/post.js');
// const Comment = require('../models/comments')

// module.exports = (app) => {
// // CREATE Comment
//     app.post("/posts/:postId/comments", function(req, res) {
//         // INSTANTIATE INSTANCE OF MODEL
//         const comment = new Comment(req.body);

//         // SAVE INSTANCE OF Comment MODEL TO DB
//         comment
//         .save()
//         .then(comment => {
//             // REDIRECT TO THE ROOT
//             return Post.findById(req.params.postId);
//         })
//         .then(post => {
//             post.comments.unshift(comment);
//             return post.save();
//         })
//         .then(post => {
//             res.redirect(`/posts/${post._id}`);
//         })
//         .catch(err => {
//             console.log(err);
//         });
//     });
// };