// include gulp
var gulp = require('gulp');

// include plug-ins
var jshint = require('gulp-jshint');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var minifyHTML = require('gulp-minify-html');

// JS hint task
gulp.task('jshint', function() {
    gulp.src('./src/scripts/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// minify new images
gulp.task('imagemin', function() {
    var imgSrc = './src/images/**/*',
        imgDst = './build/images';

    gulp.src(imgSrc)
        .pipe(changed(imgDst))
        .pipe(imagemin())
        .pipe(gulp.dest(imgDst));
});

// minify all html files
gulp.task('htmlpage', function() {
    var htmlSrc = './src/*.html',
        htmlDst = './build';

    gulp.src(htmlSrc)
        .pipe(changed(htmlDst))
        .pipe(minifyHTML())
        .pipe(gulp.dest(htmlDst));
});

