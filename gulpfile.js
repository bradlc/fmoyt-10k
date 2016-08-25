const gulp = require('gulp');

const sourcemaps = require('gulp-sourcemaps');

// CSS
const postcss = require('gulp-postcss');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const cleancss = require('gulp-clean-css');

gulp.task('css', () => {
  return gulp.src('./src/css/main.css')
    .pipe(sourcemaps.init())
    .pipe(postcss([autoprefixer, precss]))
    .pipe(cleancss())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./webroot/css'));
});

gulp.task('default', () => {
  gulp.watch('src/css/**/*', ['css']);
});
