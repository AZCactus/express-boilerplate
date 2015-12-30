'use strict';
var BaseController  = require('./base');
var passport        = require('passport');

class AuthenticationController extends BaseController {
    /**
     * Login 
     * @param  {[type]} req [description]
     * @param  {[type]} res [description]
     * @return {[type]}     [description]
     */
    login(req, res) {
        if (!req.isAuthenticated()) {
            res.render('pages/login');
            return;
        }
        res.redirect('/admin');
    }


    /**
     * Returns a callback from passport to perform the actual authentication request
     * @return {[type]} 
     */
    performLogin() {
        return passport.authenticate('local', {
            successRedirect: "/projects",
            failureRedirect: "/login",
            failureFlash: true
        });
    }
}

module.exports = AuthenticationController;