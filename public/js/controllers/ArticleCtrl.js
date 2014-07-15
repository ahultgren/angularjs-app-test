'use strict';

var config = require('../config');

module.exports = ['$scope', '$http', '$routeParams', '$sce',
  function ($scope, $http, $routeParams, $sce) {
    $http.get(config.apiUrl + '/articles/' + $routeParams.id).success(function(data) {
      $scope.id = data.id;
      $scope.title = data.title;
      $scope.resources = data.resources;

      // [TODO] Can't get filters to trust html
      $scope.resources.forEach(function (resource) {
        if(resource.type === 'text') {
          resource.text = $sce.trustAsHtml(resource.text.replace(/\n/g, '<br>'));
        }
      });
    });
  }
];
