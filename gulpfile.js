'use strict';

var gulp = require('gulp');

gulp.task('generate', function() {
});

gulp.task('checks', function() {
});

gulp.task('test', ['generate'], function() {
});

gulp.task('doc', function() {
});

gulp.task('default', ['generate', 'checks', 'test', 'doc']);

