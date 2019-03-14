const advertisement = require("./models").advertisement;

module.exports = {
    getAllAdvertisements(callback) {
        return advertisement.all()
        .then((advertisements) => {
            callback(null, advertisements);
        })
        .catch((err) => {
            callback(err);
        })
    }
}