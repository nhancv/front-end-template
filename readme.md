
## Install
sudo npm install gulp -g
npm install gulp --save-dev

npm init
npm install gulp --save-dev
npm install --save-dev jshint
npm install gulp-jshint --save-dev

//minify all image files
npm install gulp-changed --save-dev
npm install gulp-imagemin --save-dev

//minify all html files
npm install gulp-minify-html --save-dev

//JS concat, strip debugging and minify
npm install gulp-concat --save-dev
npm install gulp-strip-debug --save-dev
npm install gulp-uglify --save-dev

//CSS concat, auto-prefix and minify
npm install gulp-autoprefixer --save-dev
npm install gulp-minify-css --save-dev

//Typescript
npm install gulp-typescript --save-dev


## gulpfile.js

```
// include gulp
var gulp = require('gulp');

// JS hint task
var jshint = require('gulp-jshint');
var changed = require('gulp-changed');
gulp.task('jshint', function () {
    gulp.src('./src/scripts/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// minify new images
var imagemin = require('gulp-imagemin');
gulp.task('imagemin', function () {
    var imgSrc = './src/images/**/*',
        imgDst = './build/images';

    gulp.src(imgSrc)
        .pipe(changed(imgDst))
        .pipe(imagemin())
        .pipe(gulp.dest(imgDst));
});

// minify all html files
var minifyHTML = require('gulp-minify-html');
gulp.task('htmlpage', function () {
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
gulp.task('scripts', function () {
    gulp.src(['./src/scripts/lib.js', './src/scripts/*.js'])
        .pipe(concat('main.js'))
        //.pipe(stripDebug())
        .pipe(uglify())
        .pipe(gulp.dest('./build/scripts/'));
});

// Compile TypeScript
var ts = require('gulp-typescript');
gulp.task('scripts-ts', function () {
    gulp.src(['./src/scripts/*.ts'])
        .pipe(ts({
            noImplicitAny: true,
            out: 'output.js'
        }))
        .pipe(gulp.dest('./src/scripts/'));
});

// CSS concat, auto-prefix and minify
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
gulp.task('styles', function () {
    gulp.src(['./src/styles/*.css'])
        .pipe(concat('styles.css'))
        .pipe(autoprefix('last 2 versions'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./build/styles/'));
});

// default gulp task
gulp.task('default', ['imagemin', 'htmlpage', 'scripts-ts', 'scripts', 'styles'], function () {
    var page = ['htmlpage'];
    var style = ['styles'];
    var script_ts = ['scripts-ts'];
    var script = ['jshint', 'scripts'];
    // watch for HTML changes
    gulp.watch('./src/*.html', page);

    // watch for TS changes
    gulp.watch('./src/scripts/*.ts', script_ts);

    // watch for JS changes
    gulp.watch('./src/scripts/*.js', script);

    // watch for CSS changes
    gulp.watch('./src/styles/*.css', style);
});

```




