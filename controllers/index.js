'use strict';

var fs          = require('fs');
var path        = require('path');
var express     = require('express');
var basename    = path.basename(module.filename);
var controllers = [];

fs.readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename);
  })
  .forEach(function(file) {
    let name = path.parse(file).name;
    if (file.slice(-3) === '.js' && name !== 'base') {
        let controller = require("./" + name);
        controllers[controller.name] = new controller();
    }
  });

module.exports = controllers;