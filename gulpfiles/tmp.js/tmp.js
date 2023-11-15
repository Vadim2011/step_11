import gulp from 'gulp';
import path from 'path';

import del from "del";
import browserSync from 'browser-sync';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import replace from 'gulp-replace';
import rename from 'gulp-rename';

import fileInclude from 'gulp-file-include';
import webpHtmlNosvg from 'gulp-webp-html-nosvg';
import htmlmin from 'gulp-htmlmin';


import * as sass_ from 'sass'
import gulpSass from 'gulp-sass';
const sass = gulpSass(sass_);
import webpcss from 'gulp-webpcss';
import cleanCSS from 'gulp-clean-css';
import groupCssMediaQueries from 'gulp-group-css-media-queries';
import autoprefixer from 'gulp-autoprefixer';

import imagemin, { gifsicle, mozjpeg, optipng, svgo } from 'gulp-imagemin';
import webp from 'gulp-webp';
import svgmin from 'gulp-svgmin';
import cheerio from 'gulp-cheerio';
// import svgSprite from 'gulp-svg-sprite';
import svgcss from 'gulp-svg-css-pseudo';

import fs from 'fs';
import fonter from 'gulp-fonter-fix';
import ttf2woff2 from 'gulp-ttf2woff2';


import newer from 'gulp-newer';
import zip from 'gulp-zip';

// const PATH
export const pathRoot = path.basename(path.resolve());
export const pathDev = {
  src: {
    base: './src',
    html: './src/**/*.html',
    htm: './src/**/*.htm',
    scss: './src/scss/**/*.scss',
    img: './src/img',
    img_src: './src/img_src',
    files: './src/files/**/*.*'
  },
  build: {
    base: './dist',
    html: './dist',
    css: './dist/css',
    img: './dist/img',
    files: './dist'
  }
}

// COMPONENTS  ERRORS output  SERVER init
const plumberNotify = (title) => {
  return {
    errorHandler: notify.onError({
      title: title,
      message: 'Error <%= error.message %>',
      sound: false,
    }),
  };
};


export const serverDev = () => {
  browserSync.init({
    server: {
      baseDir: './dist'
    },
    notify: false,
    port: 8082,
  });
}

// DEL build folder
export const delDev = () => {
  return del(pathDev.build.base);
}

// COPY files
export const copyDev = () => {
  return gulp.src(pathDev.src.files)
    .pipe(gulp.dest(pathDev.build.files))
}

// HTML
// =============================================================================
export const htmlDev = () => {
  return gulp.src(pathDev.src.html)
    .pipe(plumber(plumberNotify('HTML')))
    .pipe(replace(/@img\//g, 'img/'))
    .pipe(webpHtmlNosvg())
    .pipe(fileInclude())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(pathDev.build.html))
    .pipe(browserSync.stream());
}
// =============================================================================

// SCSS
// =============================================================================
export const scssDev = () => {
  return gulp.src(pathDev.src.scss, { sourcemaps: 'true' })
    .pipe(plumber(plumberNotify('SCSS')))
    .pipe(replace(/@img\//g, '../img/'))

    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(webpcss(
      {
        webpClass: ".webp",
        noWebpClass: ".no-webp"
      }
    ))
    .pipe(groupCssMediaQueries())
    .pipe(autoprefixer({
      grid: true,
      overrideBrowserslist: ['last 2 versions'],
      cascade: true
    }))

    .pipe(gulp.dest(pathDev.build.css))

    .pipe(cleanCSS())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(pathDev.build.css))
    .pipe(browserSync.stream());
}
// =============================================================================

// IMG
// =============================================================================
export const imageminDev = () => {
  // img to min
  return gulp.src([`${pathDev.src.img_src}/**/*.{jpg,jpeg,png,gif,webp,JPG,JPEG,PNG,GIF,WEBP}`])   // [`${paths.srcImgFolder}/**/**.{jpg,jpeg,png,svg}`]
    .pipe(plumber(plumberNotify('IMAGE MIN')))
    .pipe(newer(pathDev.src.img))
    .pipe(imagemin({
      verbose: true
    }, [
      gifsicle({ interlaced: true }),
      mozjpeg({ quality: 95, progressive: true }),
      optipng({ optimizationLevel: 1 })
    ]))
    .pipe(gulp.dest(pathDev.src.img))
    .pipe(browserSync.stream());
}
export const webpDev = () => {

  // img min to webp
  return gulp.src(`${pathDev.src.img}/**/*.{jpg,png,jpeg,gif,JPG,JPEG,PNG,GIF,webp,WEBP}`)
    .pipe(plumber(plumberNotify('IMAGE WEBP')))
    .pipe(newer(pathDev.build.img))
    .pipe(webp())
    // .pipe(gulp.dest(pathDev.src.img))
    // .pipe(gulp.src('./src/img/**/*.{webp,WEBP}'))
    .pipe(gulp.dest(pathDev.build.img))
}

export const svgDev = () => {
  // svg to min
  return gulp.src([`${pathDev.src.img_src}/**/*.{svg,SVG}`])
    .pipe(plumber(plumberNotify('IMAGE SVG')))
    .pipe(newer(pathDev.src.img))
    .pipe(svgmin({
      js2svg: {
        pretty: true,
        indent: 2,
      }
    }))

    // .pipe(cheerio({
    //   run: function ($) { $('[fill]').removeAttr('fill'); $('[stroke]').removeAttr('stroke'); $('[style]').removeAttr('style'); },
    //   parserOptions: { xmlMode: true }
    // }))
    // .pipe(replace('&gt;', '>'))

    .pipe(gulp.dest(pathDev.src.img))
}

import svgSprite from "gulp-svg-sprite";
export const svgSpriteDev = () => {
  // svg sprite
  return gulp.src(`./src/img_src/svg/sprite/**/*.svg`)
    .pipe(svgSprite())
    .pipe(gulp.dest(`./dist`))
}

// svg BG
export const svgcssDev = () => {
  return gulp.src([`${pathDev.src.img_src}/svg/svgcss/**/*.{svg,SVG}`])
    .pipe(svgcss({
      fileName: '_svg_bg',
      fileExt: 'scss',
      cssPrefix: 'iconbg-',
      addSize: false
    }))
    .pipe(gulp.dest('./src/scss'))
}

// svg COPY
export const svgcopyDev = () => {
  return gulp.src([`${pathDev.src.img}/svg/**/*`,
  `!${pathDev.src.img}/svg/sprite/**`,
  `!${pathDev.src.img}/svg/svgcss/**`])

    .pipe(gulp.dest(`${pathDev.build.img}/svg`))
}
// =============================================================================


// FONTS
// =============================================================================


// =============================================================================


// ZIP
// =============================================================================
export const zipFiles = () => {
  del.sync([`./docs/*.zip`]);
  return gulp.src(`./docs/**/*.*`, {})
    .pipe(plumber(plumberNotify('ZIP')))
    .pipe(zip(`${pathRoot}.zip`))
    .pipe(gulp.dest('./docs'));
}

