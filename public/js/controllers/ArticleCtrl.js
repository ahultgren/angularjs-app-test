'use strict';

module.exports = ['$scope', '$http', '$routeParams', '$sce', 'Article',
  function ($scope, $http, $routeParams, $sce, Article) {
    Article.get({
      id: $routeParams.id
    }, function (data) {
      $scope.id = data.id;
      $scope.title = data.title;
      $scope.resources = data.resources;

      // [TODO] A saner way to trust html
      $scope.resources.forEach(function (resource) {
        if(resource.type === 'text') {
          resource.text = $sce.trustAsHtml(resource.text.replace(/\n/g, '<br>'));
        }
      });
    });
  }
];
