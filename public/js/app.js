'use strict';

var angular = require('angular');
var controllers = require('./controllers');
var routes = require('./routes');
var services = require('./services');

var app = module.exports = exports = angular.module('readerApp', [
  'ngRoute',
  controllers,
  services
]);

require('angular-route');
require('npm-angular-resource')(window, angular);
app.config(routes);
