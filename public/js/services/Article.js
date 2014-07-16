'use strict';

var config = require('../config');

module.exports = ['$resource', function ($resource) {
  return $resource(config.apiUrl + '/articles/:id', {}, {
    query: {
      method: 'GET',
      isArray: true
    }
  });
}];
