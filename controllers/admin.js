'use strict';
var BaseController = require('./base');

class AdminController extends BaseController {
    index(req, res) {
        res.send("I got here!");
    }
}

module.exports = AdminController;