const express = require("express");
const router = express.Router();

const flairController = require("../controllers/flairController");

router.get("/topics/:topicId/posts/:postId/new", flairController.new);
router.post("/topicsFlair/:topicId/posts/:postId/create", flairController.create);
router.get("/topics/:topicId/posts/:id/flair/:id", flairController.show);
router.post("/topics/:topicId/posts/:postId/flair/:id/destroy", flairController.destroy);
router.get("/topics/:topicId/posts/:postId/flair/:id/edit", flairController.edit);
router.post("/topics/:topicId/posts/:postId/flair/:id/update", flairController.update);

module.exports = router;
