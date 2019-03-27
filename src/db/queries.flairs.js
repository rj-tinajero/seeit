const Post = require("./models").Post;
const Topic = require("./models").Topic;
const Flair = require("./models").Flair;

module.exports = {
    addFlair(newFlair, callback) {
        return Flair.create(newFlair)
        .then((flair) => {
            callback(null, flair);
        })
        .catch((err) => {
            callback(err);
        })
    },
    getFlair(id, callback) {
        return Flair.findbyId(id)
        .then((flair) => {
            callback(null, flair);
        })
        .catch((err) => {
            callback(err);
        })
    },
    deleteFlair(id, callback) {
        return Flair.destroy({
            where: { id }
        })
        .then((deletedRecordsCount) => {
            console.log(deletedRecordsCount);
            callback(null, deletedRecordsCount);
        })
        .catch((err) => {
            callback(err);
        })
    }
    
}