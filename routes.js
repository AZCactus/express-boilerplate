'use strict';
var express     = require('express');
var router      = express.Router();
var models      = require('./models');
var c           = require('./controllers');
var auth        = require('./libs/authentication');

/**
 * -----------------------------------------------------------------------------
 * FILTERS
 * -----------------------------------------------------------------------------
 *
 * Initially we filter out traffic based on high level restrictions. For 
 * example, you can't access any of the admin pages without beign logged in.
 */

/* ALL Restrict access to all projects pages */
router.all('/admin\/?*', auth.restrict('is_admin'));




/**
 * -----------------------------------------------------------------------------
 * ROUTES
 * -----------------------------------------------------------------------------
 *
 * Then we define all the available routes, these may have further filtering
 */

/* GET home page. */
router.get('/', (req, res) => {res.redirect("/admin")});

/* GET login. */
router.get('/login', c.AuthenticationController.login);

/* POST login. */
router.post('/login', c.AuthenticationController.performLogin());

/* GET admin index */
router.get('/admin', c.AdminController.index);



/* EXPORT router middleware */
module.exports = router;
