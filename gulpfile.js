// //////////////////////
// Required
// //////////////////////

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var jade = require('gulp-jade');
var jshint = require('gulp-jshint');
var jsHintStylish = require('jshint-stylish');
var browserSync = require('browser-sync');
var less = require('gulp-less');
// //////////////////////
// Scripts Task
// //////////////////////
gulp.task('javascript', function() {
	gulp.src('SRC/js/*.js').pipe(gulp.dest('target/js'));
});

gulp.task('jade', function() {
	// WE LEFT OFF TRYING TO FIND A WAY TO PRETTIFY THE OUT OF THE HTML, SPITS OUT JADE FILES IN ONE LONG LINE ON HTML
	gulp.src('SRC/jade/*.jade').pipe(jade({
		"pretty": true
	})).pipe(gulp.dest('target/html'));
});

gulp.task('lint', function() {
	return gulp.src('SRC/js/*.js').pipe(jshint()).pipe(jshint.reporter(jsHintStylish));
});

gulp.task('lessCompile', function() {
	gulp.src('SRC/less/*.less').pipe(less()).pipe(gulp.dest('target/css'));
});


gulp.task('server',['jade', 'lessCompile', 'javascript'], function() {
	browserSync({
		server: {
			baseDir: './target/html/'
		},

		files: "target/html/*.html"
	});
	// the files property is the same as setting a watcher to execute the reloadServer task, much more efficient.
	gulp.watch('SRC/jade/*.jade', ['jade', 'lint']);
	gulp.watch('SRC/less/*.less', ['lessCompile']);
	//gulp.watch('target/html/*.html', ['reloadServer']);
});

gulp.task('reloadServer', function() {
	browserSync.reload();
});

// Remember to read Jason Snells Article "Transofrm HTML with
// Regular expressions"

// ALSO LOOK INTO TextBelt, it sends sms MESSAGES FOR you
// you dictate your phone number in the request header as well
// as the message!!! COOL!!
// curl -X POST http://textbelt.com/text -d number=mobile_number -d message="message_text"

//visit defaults-write.com, dotfiles and secrets (page 139 of 167 in ebook for .plist preference modifications)

// //////////////////////
// Default Task
// //////////////////////

gulp.task('default', ['server','lint', 'jade'], function() {
	// gulp.watch('SRC/jade/*.jade', ['jade', 'lint']);
	// gulp.watch('target/html/*.html', ['reloadServer']);
});