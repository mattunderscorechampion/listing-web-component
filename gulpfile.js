'use strict';

var gulp = require('gulp'),
    nunjucks = require('gulp-nunjucks'),
    filter = require('gulp-filter');

gulp.task('generate', function() {
    return gulp.src('src/templates/*')
        .pipe(nunjucks.compile())
        .pipe(filter(['**/listing-import.html', '**/listing-script.js']))
        .pipe(gulp.dest('target/dist'))
});

gulp.task('checks', function() {
});

gulp.task('test', ['generate'], function() {
});

gulp.task('doc', function() {
});

gulp.task('default', ['generate', 'checks', 'test', 'doc']);
