import gulp from 'gulp';

import {
  pathDev, pathRoot, delDev, copyDev,
  htmlDev, scssDev, imageminDev,
  webpDev, svgDev, svgSpriteDev,
  svgcssDev, svgcopyDev, imgcopyDev, fontsDev,
  fontsStyleDev, jsDev,
  serverDev
} from './gulpfiles/dev.js';

import {
  pathProd, delProd, copyProd,
  htmlProd, scssProd, imageminProd,
  webpProd, svgProd, svgSpriteProd,
  svgcssProd, svgcopyProd, imgcopyProd, fontsProd,
  fontsStyleProd, jsProd,
  serverProd
} from './gulpfiles/docs.js';

import {
  pathBack, delBack, copyBack,
  htmlBack, scssBack, imageminBack,
  webpBack, svgBack, svgSpriteBack,
  svgcssBack, svgcopyBack, imgcopyBack, fontsBack,
  fontsStyleBack, jsBack,
  serverBack
} from './gulpfiles/backend.js';


import { zipFiles} from './gulpfiles/zip.js';

import { readFileSync } from 'fs';
import rev from 'gulp-rev';
import revRewrite from 'gulp-rev-rewrite';
import revDel from 'gulp-rev-delete-original';

const cacheProd = () => {
  return gulp.src(`./docs/**/*.{css,js}`) // {css,js,svg,png,jpg,jpeg,webp,woff2
    .pipe(rev())
    .pipe(revDel())
    .pipe(gulp.dest(`./docs`))
    .pipe(rev.manifest('rev.json'))
    .pipe(gulp.dest('./docs'));
};

const rewriteProd = () => {
  const manifest = readFileSync('./docs/rev.json');
  gulp.src(`./docs/css/*.css`)
    .pipe(revRewrite({ manifest }))
    .pipe(gulp.dest(`./docs/css`));
  return gulp.src(`./docs/**/*.html`)
    .pipe(revRewrite({
      manifest
    }))
    .pipe(gulp.dest('./docs'));
}

const watcherDev = () => {
  gulp.watch(pathDev.src.files, copyDev);
  gulp.watch(pathDev.src.html, htmlDev);
  gulp.watch(pathDev.src.htm, htmlDev);
  gulp.watch(pathDev.src.scss, scssDev);
  gulp.watch(pathDev.src.js, jsDev);
  gulp.watch(pathDev.src.fonts, gulp.series(fontsDev, fontsStyleDev));
  gulp.watch(pathDev.src.img_src, gulp.series(svgDev, imageminDev, webpDev, svgcssDev, svgcopyDev, imgcopyDev));
}


const watcherProd = () => {
  gulp.watch(pathProd.src.files, copyProd);
  gulp.watch(pathProd.src.html, htmlProd);
  gulp.watch(pathProd.src.htm, htmlProd);
  gulp.watch(pathProd.src.scss, scssProd);
  gulp.watch(pathProd.src.js, jsProd);
  gulp.watch(pathProd.src.fonts, gulp.series(fontsProd, fontsStyleProd));
  gulp.watch(pathProd.src.img_src, gulp.series(svgProd, imageminProd, webpProd, svgcssProd, svgcopyProd, imgcopyProd));
}

const dev = gulp.series(delDev, copyDev, fontsDev, fontsStyleDev, htmlDev,
  scssDev, imageminDev, webpDev, svgDev, svgSpriteDev, svgcopyDev, imgcopyDev,
  svgcssDev, jsDev, gulp.parallel(serverDev, watcherDev));

gulp.task('default', dev);

const prod = gulp.series(delProd, copyProd, fontsProd, fontsStyleProd, htmlProd,
  scssProd, imageminProd, webpProd, svgProd, svgSpriteProd, svgcopyProd, imgcopyProd,
  svgcssProd, jsProd, gulp.parallel(serverProd, watcherProd));

gulp.task('build', prod);


const back = gulp.series(delBack, copyBack, fontsBack, fontsStyleBack, htmlBack,
  scssBack, imageminBack, webpBack, svgBack, svgSpriteBack, svgcopyBack, imgcopyBack,
  svgcssBack, jsBack);

gulp.task('back', back);

const cache = gulp.series(cacheProd, rewriteProd);
export { cache };

const zip = zipFiles;
export { zip };

const imagemin = imageminDev;
export { imagemin };

const svg = svgDev;
export { svg };

const svgcss = svgcssDev;
export { svgcss }

const sprite = svgSpriteDev;
export { sprite }

const fonts = gulp.series(fontsDev, fontsStyleDev);
export { fonts }

const jsdev = jsDev;
export { jsdev };

const htmlprod = htmlProd;
export { htmlprod };

const webp = webpDev;
export { webp };

const svgcopy = svgcopyDev;
export { svgcopy };

const imgcopy = imgcopyDev;
export { imgcopy };

const deploy_ftp = 'not development module';
export { deploy_ftp };
