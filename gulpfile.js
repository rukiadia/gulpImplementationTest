'use strict';

var gulp = require('gulp'),
		sass = require('gulp-sass'),
		concat = require('gulp-concat'),
		cssnano = require('gulp-cssnano'),
		notify = require('gulp-notify'),
		plumber = require('gulp-plumber'),
		rename = require('gulp-rename'),
		gulpkss = require('gulp-kss'),
		autoprefixer = require('gulp-autoprefixer'),
		runSequence = require('run-sequence'),
		browserSync = require('browser-sync').create();

/* plumber + notify */
var plumberWithNotify = function(){
	return plumber({errorHandler: notify.onError("<%= error.message %>")});
}

/* target browser list for autoprefixer */
var targetBrowsers = [
	'ie >= 9',
	'last 2 Chrome versions',
	'last 2 Firefox versions',
	'last 2 Safari versions',
	'ios >= 8',
	'android >= 4.0'
]

gulp.task('scss', function(){
	return gulp.src('assets/scss/*.scss')
		.pipe(plumberWithNotify())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({browsers: targetBrowsers, cascade: true}))
		.pipe(gulp.dest('assets/css/'));
});

gulp.task('optimize', function(){
	return gulp.src('assets/css/*.css')
		.pipe(concat('all.css'))
		.pipe(gulp.dest('assets/css/'))
		.pipe(concat('style.css'))
		.pipe(gulp.dest('styleguide/public/'))
		.pipe(cssnano())
		.pipe(rename({extname: '.min.css'}))
		.pipe(gulp.dest('assets/css/minify/'))
});

// run-sequenceでタスクの実行順序を制御
gulp.task('sass-optimize', function(){
	runSequence(
		'scss',
		'optimize',
		'kssBuild'
	);
});

// スタイルガイド生成
gulp.task('kssBuild', function() {
	/* CSSファイルのコメントをスタイルガイドのHTMLとして出力 */
	gulp.src('assets/scss/*.scss')
			.pipe(gulpkss({
				overview: 'styleguide/styleguide.md',
			}))
			.pipe(gulp.dest('styleguide/'));
});

gulp.task('server', ['scss'], function(){
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});
	gulp.watch(['**/*.html' ,'assets/scss/*.scss'], ['scss', browserSync.reload]);
});