/**
 * Created by s.yamada on 2015/07/29
 */

'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var minify = require('gulp-minify-css');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();

gulp.task('sass', function(){
	return gulp.src('assets/sass/*.sass')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('assets/css/'))
		.pipe(concat('all.css'))
		.pipe(minify())
		.pipe(rename({extname: '.min.css'}))
		.pipe(gulp.dest('assets/css/minify/'))
});

gulp.task('server', function(){
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});
	gulp.watch(['assets/sass/*.sass'], ['sass']);
});
