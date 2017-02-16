'use strict';

var gulp = require('gulp'),
    nunjucks = require('gulp-nunjucks'),
    filter = require('gulp-filter');

gulp.task('generate', function() {
    var highlightVersion = '9.9.0';
    var hightlightStyle = 'tomorrow';
    var hightlightJsUrl = '//cdn.jsdelivr.net/highlight.js/' + highlightVersion + '/highlight.min.js';
    var hightlightStyleUrl = '//cdnjs.cloudflare.com/ajax/libs/highlight.js/' + highlightVersion + '/styles/' + hightlightStyle + '.min.css';

    return gulp.src('src/templates/*')
        .pipe(nunjucks.compile({highlightJS : hightlightJsUrl, highlightCSS : hightlightStyleUrl}))
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
