'use strict';

var config = require('../config');

module.exports = ['$scope', '$http', function ($scope, $http) {
  $http.get(config.apiUrl + '/articles').success(function(data) {
    $scope.articles = data;
  });
}];
