const flairQueries = require("../db/queries.flairs.js");

module.exports = {
    new(req, res, next) {
        res.render("posts/:postId/new", {postId: req.params.postId});
    }
}