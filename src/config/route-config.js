module.exports = {
    init(app) {
        const staticRoutes = require("../routes/static");
        const macroRoutes = require("../routes/marco");

        app.use(staticRoutes);
        app.use(macroRoutes);
       
    }
}