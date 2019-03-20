module.exports = {
    init(app) {
        const staticRoutes = require("../routes/static");
        const postRoutes = require("../routes/posts");
        const aboutRoutes = require("../routes/about");
        const topicRoutes = require("../routes/topics");
        
        app.use(staticRoutes);
        app.use(postRoutes);
        app.use(aboutRoutes);
        app.use(topicRoutes);
    }
}