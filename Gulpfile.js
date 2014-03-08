var gulp = require('gulp'),
    sass = require('gulp-sass'),
    karma = require('gulp-karma'),
    refresh = require('gulp-livereload'),
    lrserver = require('tiny-lr')(),
    express = require('express'),
    livereload = require('connect-livereload'),
    livereloadport = 35729,
    serverport = 5000;

var server = express();
server.use(livereload({
  port: livereloadport
}));

server.use(express.static('./app'));

var paths = {
  scripts: "./app/js/**/*.js",
  styles: "./app/scss/**/*.scss",
  tests: "./tests/**/*Spec.js",
  html: "./app/**/*.html"
};

gulp.task('html', function() {
  gulp.src(paths.html)
    .pipe(refresh(lrserver));
});

gulp.task('serve', function() {
  server.listen(serverport);
  lrserver.listen(livereloadport);
});

gulp.task('sass', function () {
  gulp.src("./app/scss/main.scss")
    .pipe(sass())
    .pipe(gulp.dest('./app/css'));
});

gulp.task('test', function() {
  // Be sure to return the stream
  return gulp.src(paths.tests)
    .pipe(karma({
      configFile: './config/karma.conf.js',
      action: 'run'
    }));
});

gulp.task('default',['watch', 'serve'], function() {});

gulp.task('watch',['sass'], function () {
  gulp.watch(paths.styles, ['sass']);
  gulp.watch(paths.html, ['html']);

  gulp.src(paths.tests)
    .pipe(karma({
      configFile: './config/karma.conf.js',
      action: 'watch'
    }));


});
