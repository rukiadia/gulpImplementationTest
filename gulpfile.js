/**
 * Created by s.yamada on 2015/07/29
 */
var gulp = require('gulp');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');
var minify = require('gulp-minify-css');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();

gulp.task('stylus', function(){
	return gulp.src('styl/**/*.styl')
		.pipe(stylus())
		.pipe(gulp.dest('css/'))
		.pipe(concat('all.css'))
		.pipe(minify())
		.pipe(rename({extname: '.min.css'}))
		.pipe(gulp.dest('css/minify/'))
});

gulp.task('server', function(){
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});
	gulp.watch(['styl/**/*.styl'], ['stylus']);
});
