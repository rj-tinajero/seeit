const flairQueries = require("../db/queries.flairs.js");

module.exports = {
    new(req, res, next) {
        res.render("/topics/:topicId/posts/:postId/new", {postId: req.params.postId});
    }
}