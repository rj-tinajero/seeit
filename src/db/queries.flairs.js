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
        return Flair.findById(id)
        .then((flair) => {
            callback(null, flair);
        })
        .catch((err) => {
            callback(err);
        })
    },
    deleteFlair(postId, callback) {
        console.log(postId);
        return Flair.destroy({
            where: { postId }
        })
        .then((deletedRecordsCount) => {
            console.log("???", deletedRecordsCount);
            callback(null, deletedRecordsCount);
        })
        .catch((err) => {
            callback(err);
        })
    },
    updateFlair(postId, updatedFlair, callback){
        return Flair.findById(postId)
        .then((flair) => {
          if(!flair){
            return callback("Flair not found");
          }
          flair.update(updatedFlair, {
            fields: Object.keys(updatedFlair)
          })
          .then(() => {
            callback(null, flair);
          })
          .catch((err) => {
            callback(err);
          });
        });
      }
    
}