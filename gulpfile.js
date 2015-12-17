var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function(){
  return gulp.src('app/sass/**/*.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('autoprefixer', function() {
    return gulp.src('app/css/style.css')
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
      }))
    .pipe(gulp.dest('app/css/style.css'));
});

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'app',
    },
  })
});

gulp.task('minify-css', function() {
  return gulp.src('app/css/*.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest('app/css'));
});

//Watch task
gulp.task('watch', ['browserSync', 'sass', 'minify-css', 'autoprefixer'], function() {
    gulp.watch('app/sass/**/*.scss',['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/app.js', browserSync.reload);
});