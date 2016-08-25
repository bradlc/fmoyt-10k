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

// JavaScript
const rollup = require('rollup').rollup;
const babel = require('rollup-plugin-babel');

gulp.task('js', () => {
  return rollup({
    entry: './src/js/main.js',
    plugins: [
      babel({
        exclude: 'node_modules/**',
      }),
    ],
  }).then(bundle => {
    return bundle.write({
      format: 'iife',
      dest: './webroot/js/main.js',
    });
  });
});

gulp.task('default', () => {
  gulp.watch('src/css/**/*', ['css:lint', 'css']);
  gulp.watch('src/js/**/*', ['js']);
});
