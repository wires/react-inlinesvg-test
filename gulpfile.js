var path = require("path");
var express = require('express');

var gulp = require('gulp');
var $ = require("gulp-load-plugins")();

// help gulp-browserify not fail so hard all the time
function handleError(err) {
    console.log(err.toString());
    this.emit('end');
}

$.livereload.options.debug = true;

// quick and dirty live reload
function asyncStartHTTP() {

    // create random port for live-reload server
    var ports = {
        app: 3003,
        livereload: Math.floor(Math.random()*10000) + 30000
    };

    // content
    express()
        .use(require('connect-livereload')({port: ports.livereload}))
        .use(express.static(path.resolve('.')))
        .listen(ports.app, function success(){
            console.log("HTTP app server started at http://localhost:" + ports.app);
        });

    // livereload
    console.log("LR server starting at https://localhost:" + ports.livereload);
    $.livereload.listen(ports.livereload);
}


gulp.task('scripts', function() {
    return gulp.src('index.js')
        .pipe($.browserify({
            insertGlobals : false,
            transform: ["reactify"]
        }))
        .on('prebundle', function(bundle) {
            // React Dev Tools tab won't appear unless
            // we expose the react bundle
            bundle.require('react');
        })
        .on('error', console.log)
        .pipe($.concat('bundle.js'))
        .pipe(gulp.dest('.'))
        .pipe($.livereload());
});

gulp.task('default', ['scripts'], function(){
    asyncStartHTTP();
    gulp.watch(['index.js'], ['scripts']);
});
