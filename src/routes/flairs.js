const express = require("express");
const router = express.Router();

const flairController = require("../controllers/flairController")

router.get("/topics/:topicId/posts/:postId/new", flairController.new);
router.post("/topics/:topicId/posts/:postId/create", flairController.create);
router.get("/topics/:topicId/posts/:id", flairController.show);
router.post("/topics/:topicId/posts/:id/destroy", flairController.destroy);

module.exports = router;
