module.exports = {
    init(app) {
        const staticRoutes = require("../routes/static");
        const aboutRoutes = require("../routes/about");
        const topicRoutes = require("../routes/topics");
        
        app.use(staticRoutes);
        app.use(aboutRoutes);
        app.use(topicRoutes);
    }
}