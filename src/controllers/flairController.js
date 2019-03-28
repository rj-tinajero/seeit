const flairQueries = require("../db/queries.flairs.js");

module.exports = {
    new(req, res, next) {
        res.render("flairs/new", {postId: req.params.postId, topicId: req.params.topicId});
    },
    create(req, res, next) {
        let newFlair = {
            name: req.body.title,
            color: req.body.body,
            postId: req.params.postId
        };
        flairQueries.addFlair(newFlair, (err, flair) => {
            if(err) {
                res.redirect(500, "/posts/:postId");
            } else {
                res.redirect(303, `/topics/${newFlair.postId}/posts/${flair.id}`);
            }
        });
    },
    show(req, res, next) {
        flairQueries.getFlair(req.params.id, (err, flair) => {
            if(err || flair == null) {
                res.redirect(404, "/");
            } else {
                res.render("posts/show", {flair});
            }
        });
    },
    destroy(req, res, next) {
        flairQueries.deleteFlair(req.params.id, (err, deletedRecordsCount) => {
            if(err) {
                res.redirect(500, `/topics/${req.params.topicId}/posts/${req.params.postId}`)
            } else {
                res.redirect(303, `/topics/${req.params.topicId}/posts/${req.params.postId}`)
            }
        })
    }
}