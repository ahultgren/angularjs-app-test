'use strict';

module.exports = 'readerControllers';

var angular = require('angular');
var controllers = angular.module(module.exports, []);

controllers.controller('ArticlesCtrl', require('./ArticlesCtrl'));
controllers.controller('ArticleCtrl', require('./ArticleCtrl'));
