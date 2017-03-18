
var gulp = require('gulp');
var concat = require('gulp-concat');
var useref = require('gulp-useref');

gulp.task('copy_font-awesome', function() {
	
	gulp.src('bower_components/font-awesome/fonts/*')
		.pipe(gulp.dest('public/fonts/'))
	
});

gulp.task('copy_html', function() {
	
	gulp.src('src/views/*.html')
		.pipe(useref())
		.pipe(gulp.dest('public/views'))	
		
});

gulp.task('copy_images', function() {
	
	gulp.src('src/images/**/*')
		.pipe(gulp.dest('public/images/'))		
	
		
});


gulp.task('default', ['copy_html','copy_images','copy_font-awesome'], function() {
	
	gulp.src('src/index.html')
		.pipe(useref())
		.pipe(gulp.dest('public/'))		
	
		
});