const gulp = require('gulp');
const watch = require('gulp-watch');
const rollup = require('gulp-rollup');
const replace = require('rollup-plugin-replace');
var babel = require('gulp-babel');

const entry = './src/server/**/*.js';
const cleanEntry = './src/server/config/index.js';
function builddev() {
  return watch(
    entry,
    {
      ignoreInitial: false
    },
    function() {
      gulp
        .src(entry)
        .pipe(
          babel({
            babelrc: false,
            plugins: [
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              '@babel/plugin-transform-modules-commonjs'
            ]
          })
        )
        .pipe(gulp.dest('dist'));
    }
  );
  // .pipe(gulp.dest('dist'))
}
function buildprod() {
  return gulp
    .src(entry)
    .pipe(
      babel({
        babelrc: false,
        plugins: [
          ['@babel/plugin-proposal-decorators', { legacy: true }],
          '@babel/plugin-transform-modules-commonjs'
        ]
      })
    )
    .pipe(gulp.dest('dist'));
}
function buildconfig() {
  return gulp
    .src(entry)

    .pipe(
      rollup({
        input: cleanEntry,
        output: {
          format: 'cjs'
        },
        plugins: [
          replace({
            'process.env.NODE_ENV': JSON.stringify('production')
          })
        ]
      })
    )
    .pipe(gulp.dest('dist'));
}
function init() {}

let build = gulp.series(builddev);
if (process.env.NODE_ENV == 'production') {
  build = gulp.series(buildprod, buildconfig);
}
if (process.env.NODE_ENV == 'linit') {
  build = gulp.series(lint);
}

gulp.task('default', build);
