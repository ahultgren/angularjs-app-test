'use strict';

var angular = require('angular');
var controllers = require('./controllers');
var routes = require('./routes');

var app = module.exports = exports = angular.module('readerApp', [
  'ngRoute',
  controllers
]);

require('angular-route');
app.config(routes);
