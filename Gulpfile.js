var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    karma = require('gulp-karma');

var paths = {
  scripts: "./app/js/**/*.js",
  styles: "./app/scss/**/*.scss",
  tests: "./tests/**/*Spec.js"
};

gulp.task('sass', function () {
  gulp.src("./app/scss/main.scss")
    .pipe(sass())
    .pipe(gulp.dest('./app/css'));
});

/*gulp.task('uglify', function() {
  gulp.src(paths.scripts)
    .pipe(concat('production.js'))
    .pipe(uglify({outSourceMap: false}))
    .pipe(gulp.dest('./app/dist'))
});*/

gulp.task('test', function() {
  // Be sure to return the stream
  return gulp.src(paths.tests)
    .pipe(karma({
      configFile: './config/karma.conf.js',
      action: 'run'
    }));
});

gulp.task('default', function() {


});

gulp.task('watch', function () {
//  gulp.watch(paths.scripts, ['uglify']);
  gulp.watch(paths.styles, ['sass']);

  gulp.src(paths.tests)
    .pipe(karma({
      configFile: './config/karma.conf.js',
      action: 'watch'
    }));
});
