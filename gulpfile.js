/**
 * Created by s.yamada on 2015/07/29
 */

'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var minify = require('gulp-minify-css');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();

gulp.task('sass', function(){
	return gulp.src('assets/sass/*.sass')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('assets/css/'));
});

gulp.task('optimize', function(){
	return gulp.src('assets/css/*.css')
		.pipe(concat('all.css'))
		.pipe(gulp.dest('assets/css/'))
		.pipe(minify())
		.pipe(rename({extname: '.min.css'}))
		.pipe(gulp.dest('assets/css/minify/'))
});

// run-sequenceでタスクの実行順序を制御
gulp.task('sass-optimize', function(){
	runSequence(
		'sass',
		'optimize'
	);
});

gulp.task('server', function(){
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});
	gulp.watch(['assets/sass/*.sass'], ['sass']);
});
