const gulp = require('gulp');
const uglify = require('gulp-uglify')
const livereload = require('gulp-livereload')
const concat = require('gulp-concat')
//const minifyCss = require('gulp-minify-css')
const autoprefixer = require('gulp-autoprefixer')
const plumber = require('gulp-plumber')
const sourcemaps = require('gulp-sourcemaps')
const sass = require('gulp-sass')
const babel = require('gulp-babel')

// Use browsersync
// const browserSync = require('browser-sync').create();
// const browsersync = true;

// Image compression
var imagemin = require('gulp-imagemin');
var imageminPngquant = require('imagemin-pngquant');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');

var paths = {
  dist: {
    css:  './dist/css',
    js: './dist/js',
    img: './dist/img'
  },
  src: {
    css: './src/css/**/*.css',
    sass: './src/sass/main.sass',
    js: './src/js/**/*.js',
    img: './src/img/**/*.{png,jpeg,jpg,svg,gif}'
  }

}


gulp.task('styles', function () {
  console.log('Building Styles.......')
  return gulp.src(paths.src.sass)
    .pipe(plumber(function (err) {
      console.log('Error in Styles')
      console.log(err)
      this.emit('end')
    }))  
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(autoprefixer())  
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dist.css))
    .pipe(livereload());
    //.pipe(browserSync.stream());
})


gulp.task('scripts', function () {
  console.log('Building Scripts.......')

  return gulp.src('./src/js/*.js')
    .pipe(plumber(function (err) {
      console.log('Error in Scripts')
      console.log(err)
      this.emit('end')
    }))    
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/js'))
    .pipe(livereload());
})

gulp.task('images', function () {
  console.log('Building Images.......')
  return gulp.src(paths.src.img)
		.pipe(imagemin(
			[
				imagemin.gifsicle(),
				imagemin.jpegtran(),
				imagemin.optipng(),
				imagemin.svgo(),
				imageminPngquant(),
				imageminJpegRecompress()
			]
		))
		.pipe(gulp.dest(paths.dist.img));
})

gulp.task('watch', ['default'], function () {
  require('./server.js');
  // if (browsersync) {
  //   browserSync.init({
  //     server: {
  //         baseDir: "./dist"
  //     },
  //     notify: false
  // });
  // } else {
    livereload.listen()
  //}
    
  gulp.watch(paths.src.js, ['scripts'])
  gulp.watch('./src/sass/**/*.{sass.scss}', ['styles'])
  //gulp.watch(['dist/*.html', 'dist/css/*.css', 'dist/js/*.js']).on('change', browserSync.reload);
})

gulp.task('default', ['images', 'styles', 'scripts'], function () {
  console.log('Running Gulp.......')
 
})


