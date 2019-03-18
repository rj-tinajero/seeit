const advertisement = require("./models").advertisements;

module.exports = {
    getAllAdvertisements(callback) {
        return advertisement.all()
        .then((advertisements) => {
            callback(null, advertisements);
        })
        .catch((err) => {
            callback(err);
        })
    },
    addAdvertisement(newAdvertisement, callback){
        return advertisement.create({
          title: newAdvertisement.title,
          description: newAdvertisement.description
        })
        .then((advertisement) => {
          callback(null, advertisement);
        })
        .catch((err) => {
          callback(err);
        })
      },
    getAd(id, callback) {
        return advertisement.findById(id)
        .then((advertisement) => {
            callback(null, advertisement);
        })
        .catch((err) => {
            callback(err);
        })
    },
    deleteAd(id, callback) {
        return advertisement.destroy({
            where: {id}
        })
        .then((advertisement) => {
            callback(null, advertisement);
        })
        .catch((err) => {
            callback(err);
        })
    },
    updateAd(id, updatedAd, callback){
        return advertisement.findById(id)
        .then((advertisement) => {
          if(!advertisement){
            return callback("Ad not found");
          }
          advertisement.update(updatedAd, {
            fields: Object.keys(updatedAd)
          })
          .then(() => {
            callback(null, advertisement);
          })
          .catch((err) => {
            callback(err);
          });
        });
      }
}