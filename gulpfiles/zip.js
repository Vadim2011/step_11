import gulp from 'gulp';
import path from 'path';

import del from "del";

import plumber from 'gulp-plumber';
import notify from 'gulp-notify';

import zip from 'gulp-zip';


// const PATH
export const pathRoot = path.basename(path.resolve());

const plumberNotify = (title) => {
  return {
    errorHandler: notify.onError({
      title: title,
      message: 'Error <%= error.message %>',
      sound: false,
    }),
  };
};

// ZIP
// =============================================================================
export const zipFiles = () => {
  del.sync([`./docs/*.zip`]);
  return gulp.src(`./docs/**/*.*`, {})
    .pipe(plumber(plumberNotify('ZIP')))
    .pipe(zip(`${pathRoot}.zip`))
    .pipe(gulp.dest('./'));
}
