/**
 * Created by s.yamada on 2015/07/29
 */
var gulp = require('gulp');
var stylus = require('gulp-stylus');

gulp.task('stylus', function(){
	return gulp.src('styl/**/*.styl').pipe(stylus()).pipe(gulp.dest('css/'));
});
