module.exports = {
    init(app) {
        const staticRoutes = require("../routes/static");
        const postRoutes = require("../routes/posts");
        const aboutRoutes = require("../routes/about");
        const topicRoutes = require("../routes/topics");
        const flairRoutes = require("../routes/flairs");
        const userRoutes = require("../routes/users");
        
        app.use(staticRoutes);
        app.use(postRoutes);
        app.use(aboutRoutes);
        app.use(topicRoutes);
        app.use(flairRoutes);
        app.use(userRoutes);
    }
}