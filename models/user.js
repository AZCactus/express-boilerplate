'use strict';
var config = require('config');
var crypto = require('crypto');

module.exports = function(sequelize, DataTypes) {
  var hashPassword = function (password) {
    return crypto
      .createHmac("md5", config.get('salt'))
      .update(password)
      .digest('hex');
  };

  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      set: function(password) {
        this.setDataValue('password', hashPassword(password));
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        User.hasMany(models.Permission);
      }
    },
    instanceMethods: {
      isValidPassword: function(password) {
          return (this.password == hashPassword(password));
      },
      access: function(permission) {
        return new Promise((resolve, reject) => {

          if (this.Permissions) {
            console.log(this.Permissions);
            for (var perm of this.Permissions) {
              if (perm.type == permission) {
                resolve(perm);
              }
            }
            reject("not_authorized");

          } else {
            this.getPermissions({where: {"type": permission}})
            .then(perm => {
              if (perm.count) {
                resolve(perm);
              } else {
                reject("not_authorized");
              }
            })
            .catch(err => reject(err));
          }
        });
      }
    }
  });
  return User;
};