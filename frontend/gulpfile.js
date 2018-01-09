const gulp = require('gulp');
const scssLint = require('gulp-scss-lint');

gulp.task('scss-lint', function () {
  gulp.src('src/scss/**/*.scss')
      .pipe(scssLint({config: '.scss-lint.yml'}));
});
