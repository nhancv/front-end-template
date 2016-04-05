// include gulp
var gulp = require('gulp');

// JS hint task
var jshint = require('gulp-jshint');
var changed = require('gulp-changed');
gulp.task('jshint', function() {
    gulp.src('./src/scripts/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// minify new images
var imagemin = require('gulp-imagemin');
gulp.task('imagemin', function() {
    var imgSrc = './src/images/**/*',
        imgDst = './build/images';

    gulp.src(imgSrc)
        .pipe(changed(imgDst))
        .pipe(imagemin())
        .pipe(gulp.dest(imgDst));
});

// minify all html files
var minifyHTML = require('gulp-minify-html');
gulp.task('htmlpage', function() {
    var htmlSrc = './src/*.html',
        htmlDst = './build';

    gulp.src(htmlSrc)
        .pipe(changed(htmlDst))
        .pipe(minifyHTML())
        .pipe(gulp.dest(htmlDst));
});

// JS concat, strip debugging and minify
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
gulp.task('scripts', function() {
    gulp.src(['./src/scripts/lib.js','./src/scripts/*.js'])
        .pipe(concat('script.js'))
        .pipe(stripDebug())
        .pipe(uglify())
        .pipe(gulp.dest('./build/scripts/'));
});

// CSS concat, auto-prefix and minify
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
gulp.task('styles', function() {
    gulp.src(['./src/styles/*.css'])
        .pipe(concat('styles.css'))
        .pipe(autoprefix('last 2 versions'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./build/styles/'));
});




