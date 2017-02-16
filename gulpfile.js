'use strict';

var gulp = require('gulp'),
    nunjucks = require('gulp-nunjucks'),
    filter = require('gulp-filter'),
    http = require('http');

var highlightVersion = '9.9.0';
var hightlightStyle = 'tomorrow';
var style;

function loadStyle(version, style) {
    return new Promise(function (accept, reject) {
        if (version == undefined || style == undefined || version == null || style == null) {
            reject(new Error('Two parameters needed'));
            return;
        }

        http.get({
            hostname: 'cdnjs.cloudflare.com',
            port: 80,
            path: '/ajax/libs/highlight.js/' + version + '/styles/' + style + '.min.css'
        }, function (res) {
            if (res.statusCode != 200) {
                reject(new Error('Status code ' + res.statusCode));
            }

            var data = '';
            res.on('data', function (chunk) {
                data += chunk;
            });
            res.on('end', function () {
                accept(data);
            });
        }).on('error', function (e) {
            reject(e);
        });
    });
}

gulp.task('load-style', function () {
    return loadStyle(highlightVersion, hightlightStyle).then(function (s) {
        style = s;
    });
});

gulp.task('generate', ['load-style'], function() {
    var hightlightJsUrl = '//cdn.jsdelivr.net/highlight.js/' + highlightVersion + '/highlight.min.js';
    var hightlightStyleUrl = '//cdnjs.cloudflare.com/ajax/libs/highlight.js/' + highlightVersion + '/styles/' + hightlightStyle + '.min.css';

    return gulp.src('src/templates/*')
        .pipe(nunjucks.compile({highlightJS : hightlightJsUrl, highlightCSS : hightlightStyleUrl, inlineStyle: style}))
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
