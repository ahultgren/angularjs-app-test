'use strict';

var gulp = require('gulp');
var util = require('gulp-util');
var rename = require('gulp-rename');
var browserify = require('gulp-browserify');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');


var clientJsDir = 'public/js';
var clientJsRoot = clientJsDir + '/main.js';
var clientJsDest = 'public/dist';
var clientJsMin = 'main.min.js';

var lessDir = 'public/less';
var lessRoot = lessDir + '/main.less';
var cssDest = 'public/dist';
var cssMin = 'main.min.css';


gulp.task('lint', function() {
  gulp.src([clientJsDir + '/**/*.js'])
    .pipe(jshint())
    .on('error', handleError)
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('browserify', function() {
  var bundle = gulp.src(clientJsRoot)
    .pipe(browserify())
    .on('error', handleError)
    .pipe(uglify())
    .pipe(rename(clientJsMin))
    .pipe(gulp.dest(clientJsDest));
});

gulp.task('less', function () {
  gulp.src(lessRoot)
    .pipe(sourcemaps.init())
    .pipe(less({
      compress: true
    }))
    .on('error', handleError)
    .pipe(rename(cssMin))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(cssDest));
});

gulp.task('watch', function () {
  gulp.watch([clientJsDir + '/**/*.js'], ['build_js']);
  gulp.watch([lessDir + '/**/*.less'], ['build_css']);
});

gulp.task('build', ['build_js', 'build_css']);
gulp.task('build_js', ['lint', 'browserify']);
gulp.task('build_css', ['less']);

gulp.task('default', ['build', 'watch']);


/* Helpers
============================================================================= */

function handleError (error) {
  util.log(error.message);
}
