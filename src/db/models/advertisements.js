'use strict';
module.exports = (sequelize, DataTypes) => {
  var advertisements = sequelize.define('advertisements', {
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  advertisements.associate = function(models) {
    // associations can be defined here
  };
  return advertisements;
};