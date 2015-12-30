'use strict';
var models          = require('../models');
var passport        = require('passport');
var localStrategy   = require('passport-local').Strategy;
var messages        = require('config').get("messages");

class Authentication {
  /**
   * Create our middleware object
   * @param  {request}   req   express request object
   * @param  {response}  res   express response object
   * @param  {Function}  next  middleware fullfillment object
   * @return {void}
   */
  constructor(req, res, next) {
    this.req = req;
    this.res = res;
    req.perm = (permission) => this.hasPermission(permission);
    this.initializePassport();
    next();
  }


  /**
   * Initialize the passport library with the required methods
   * @return {void}
   */
  initializePassport() {
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => this.deserializeUser(id, done));
    var stragegy = new localStrategy(
      (username, password, done) => this.authenticateUser(username, password, done)
    );
    passport.use(stragegy);
  }


  /**
   * Authenticate a given user
   * @param  {string}   username a username to authenticate
   * @param  {string}   password a password
   * @param  {Function} done     promise fullfillment method
   * @return {void}
   */
  authenticateUser(username, password, done) {
    models.User.findOne({
      where: {
        username: username
      }
    })
    .then(user => {
      if (user && user.isValidPassword(password)) {
        return done(null, user);
      }
      return done(null, false, {"message": "Incorrect username or password"});
    })
    .catch(err => done(err));
  }


  /**
   * Deserialize the user from the stored session
   * @param  {integer}   id   integer required to do the lookup of the user
   * @param  {Function}  done the promise fullfillment which needs to be called
   * @return {void}
   */
  deserializeUser(id, done) {
    models.User.findById(id, {include: models.Permission})
    .then(user => done(null, user))
    .catch(err => done(err));
  }




  /**
   * Checks access of the user to a particular permission
   * @param  {[type]} permission [description]
   * @return {[type]}            [description]
   */
  hasPermission(permission) {
    if (this.req.user) {
      return this.req.user.access(permission);
    }

    // If the user is not logged in
    return new Promise(function(resolve, reject){
      reject("unauthenticated");
    });
  }


  /**
   * Utility to restrict access to routes unauthenticated users, or users 
   * below a given level
   * @param  {string} permission  Arbitrary string permission to check for
   * @return {function}           Returns a route function
   */
  static restrict(permission, message) {
    return function(req, res, next) {
      if (req.isAuthenticated()) {
        // The permission to check for is empty
        if (!permission) {
          return next();
        }

        // check if the user has access
        req.user.access(permission)
        .then(value => next())
        .catch(error => {
          req.flash("error", messages[error])
          res.redirect("/login", 301);
        });
      
      } else {
        // The user has not logged in
        req.flash("error", "You must be logged in to access that page");
        res.redirect("/login", 301);
      }
    }
  }
}



// Export our primary authorization controller
exports.middleware = function (req, res, next) {
  return new Authentication(req, res, next);
}


// Export an 
exports.restrict = Authentication.restrict;
