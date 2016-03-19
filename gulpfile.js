/**
 * Created by Administrator on 2016/3/12 0012.
 */


var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-minify-css');


var root = 'public'; // ¸ùÄ¿Â¼
var path = {
    sass: root + '/sass/',
    css: root + '/css',
    js: root + '/js/'
};
gulp.task('sass', function () {
    gulp.src(path.sass + '*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(path.css));
});

//gulp.task('minifyCss', function () {
//    gulp.src(path.sass + 'main.css')
//        .pipe(minifyCss().on('error', sass.logError))
//        .pipe(gulp.dest(path.css));
//});

gulp.task('sass:watch', function () {
    gulp.watch(path.sass + '**/*.scss', ['sass']);
    console.log(path.sass + '**/*.scss');
});

