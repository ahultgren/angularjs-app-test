'use strict';

var gitPull = require('lets-git-pull');
var sshUtils = require('lets-git-pull/lib/utils');
var format = sshUtils.format;
var async = require('async');


module.exports = function (config) {
  var production = config.Stage({
    host: 'ahultgren.webfactional.com',
    repository: 'git@github.com:ahultgren/angularjs-app-test.git',
    remotePath: '/home/ahultgren/lets/readerapp',
    deployPath: '/home/ahultgren/webapps/readerapp_andreashultgren_se',
    agentForward: true
  });

  production.config(require('./lets/auth/production'));
  production.plugin(gitPull());

  production.post('deploy:setup', function (options, done) {
    this.getConnection(function (c) {
      var sharedNodeModules = options.remotePath + '/shared/node_modules';

      c.exec(format('mkdir -p {0}', sharedNodeModules), done);
    });
  });

  production.post('deploy:update', function (options, done) {
    this.getConnection(function (c) {
      var sharedNodeModules = options.remotePath + '/shared/node_modules';
      var localNodeModules = options.currentPath + '/node_modules';
      var sharedConfig = options.remotePath + '/shared/config.json';
      var localConfig = options.currentPath + '/public/js/config.json';
      var symlink = symlinkCurry(c);

      async.series([
        symlink(sharedNodeModules, localNodeModules),
        symlink(sharedConfig, localConfig),
        c.exec.bind(c, format('cd {0} && npm install', options.currentPath)),
        c.exec.bind(c, format('cd {0} && {1} build', options.currentPath,
          options.currentPath + '/node_modules/.bin/gulp'))
      ], done);
    });
  });

  production.post('deploy:publish', function (options, done) {
    this.getConnection(function (c) {
      var symlink = symlinkCurry(c);

      // This is a bit uglier than usual since webfaction doesn't seem to let me
      // replace the app folder with a symlink
      async.series([
        symlink(options.current + '/public/index.html', options.deployPath + '/index.html'),
        symlink(options.current + '/public/dist', options.deployPath + '/dist'),
        symlink(options.current + '/public/partials', options.deployPath + '/partials')
      ], done);
    });
  });

  config.addStage('production', production);
};


function symlinkCurry (c) {
  return function symlink (existing, link) {
    return function exec (callback) {
      c.exec(format('ln -nfs {0} {1}', existing, link), callback);
    };
  };
}
