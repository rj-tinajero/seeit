const express = require("express");
const validation = require("./validation");
const helper = require("../auth/helpers");
const router = express.Router();

const postController = require("../controllers/postController");

router.get("/topics/:topicId/posts/new", postController.new);
router.post("/topics/:topicId/posts/create", helper.ensureAuthenticated,
 validation.validatePosts, 
 postController.create);
router.get("/topics/:topicId/posts/:id", postController.show);
router.post("/topics/:topicId/posts/:id/destroy", helper.ensureAuthenticated, postController.destroy);
router.get("/topics/:topicId/posts/:id/edit", helper.ensureAuthenticated, postController.edit);
router.post("/topics/:topicId/posts/:id/update", helper.ensureAuthenticated, validation.validatePosts, postController.update);

module.exports = router;