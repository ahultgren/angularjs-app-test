'use strict';

module.exports = ['$scope', '$http', 'Article',
  function ($scope, $http, Article) {
    $scope.articles = Article.query({
      count: 50
    });
  }
];
