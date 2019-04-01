const flairQueries = require("../db/queries.flairs.js");

module.exports = {
    new(req, res, next) {
        res.render("flairs/new", {postId: req.params.postId, topicId: req.params.topicId, id: req.params.id});
    },
    create(req, res, next) {
        let newFlair = {
            name: req.body.title,
            color: req.body.body,
            postId: req.params.postId,
            id: req.params.id,
            topicId: req.params.topicId
        };
        flairQueries.addFlair(newFlair, (err, flair) => {
            if(err) {
                res.redirect(500, "/posts/:postId");
            } else {
                res.redirect(303, `/topics/${newFlair.postId}/posts/${newFlair.postId}`);
            }
        });
    },

    edit(req, res, next) {
        flairQueries.getFlair(req.params.id, (err, flair) => {
            
            if(err || flair == null) {
                res.redirect(404, "/");
            } else {
                res.render("flairs/edit", {flair, topicId: req.params.topicId})
            }
        }) 
    },
    show(req, res, next) {
        console.log("flairController");
        console.log(req.params.id);
        flairQueries.getFlair(req.params.id, (err, flair) => {
            if(err || flair == null) {
                res.redirect(404, "/");
            } else {
                res.render("flairs/show", {flair, topicId: req.params.topicId});
            }
        });
    },
    destroy(req, res, next) {
        console.log("flairController");
        flairQueries.deleteFlair(req.params.id, (err, deletedRecordsCount) => {
            console.log(req.params);
            if(err) {
                res.redirect(500, `/topics/${req.params.topicId}/posts/${req.params.postId}`)
            } else {
                res.redirect(303, `/topics/${req.params.topicId}/posts/${req.params.postId}`)
            }
        })
    },
    update(req, res, next){
        flairQueries.updateFlair(req.params.id, req.body, (err, flair) => {
            console.log(req.body);
            console.log("flairController");
          if(err || flair == null){
              console.log(flair);
            res.redirect(404, `/topics/${req.params.topicId}/posts/${req.params.postId}/flair/${req.params.id}/edit`);
          } else {
            res.redirect(`/topics/${req.params.topicId}/posts/${req.params.postId}/flair/${req.params.id}`);
          }
        });
      }
}