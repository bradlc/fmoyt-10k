const gulp = require('gulp');

const sourcemaps = require('gulp-sourcemaps');

// CSS
const postcss = require('gulp-postcss');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const cleancss = require('gulp-clean-css');
const stylelint = require('gulp-stylelint');

gulp.task('css:lint', () => {
  return gulp.src('./src/css/**/*.css')
    .pipe(stylelint({
      reporters: [
        { formatter: 'string', console: true }
      ]
    }));
});

gulp.task('css', () => {
  return gulp.src('./src/css/main.css')
    .pipe(sourcemaps.init())
    .pipe(postcss([autoprefixer, precss]))
    .pipe(cleancss())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./webroot/css'));
});

gulp.task('default', () => {
  gulp.watch('src/css/**/*', ['css:lint', 'css']);
});
