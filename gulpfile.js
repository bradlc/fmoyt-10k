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
    .pipe(postcss([precss]))
    .pipe(cleancss())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./webroot/css'));
});

// JavaScript
const rollup = require('rollup-stream');
const babel = require('rollup-plugin-babel');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const eslint = require('gulp-eslint');

gulp.task('js:lint', () => {
  return gulp.src('./src/js/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
});

gulp.task('js', () => {
  return rollup({
    entry: './src/js/main.js',
    sourceMap: true,
    format: 'iife',
    rollup: require('rollup'),
    plugins: [
      babel({
        exclude: 'node_modules/**',
      }),
    ],
  })
  .pipe(source('main.js', './src/js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({ loadMaps: true }))
  .pipe(uglify())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('./webroot/js'));
});

// Views
const inline = require('gulp-inline-source');
const htmlmin = require('gulp-htmlmin');

gulp.task('views', ['css'], () => {
  return gulp.src('./src/views/**/*.handlebars')
    .pipe(inline())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./views'));
});

gulp.task('build', ['views', 'js']);

gulp.task('default', ['build'], () => {
  gulp.watch('src/css/**/*', ['css:lint', 'views']);
  gulp.watch('src/js/**/*', ['js:lint', 'js']);
  gulp.watch('src/views/**/*', ['views']);
});
