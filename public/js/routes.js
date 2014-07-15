'use strict';

module.exports = ['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/articles.html',
        controller: 'ArticlesCtrl'
      }).
      when('/articles/:id', {
        templateUrl: 'partials/article.html',
        controller: 'ArticleCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }
];
