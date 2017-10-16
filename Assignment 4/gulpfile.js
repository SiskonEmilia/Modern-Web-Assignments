var gulp = require('gulp');
// main module
var uglify = require('gulp-uglify');
// module to compass JavaScript files
var minifyCSS = require('gulp-minify-css');
// module to compass CSS files
var watchPath = require('gulp-watch-path');
// module to optimize efficiency of watcher
var gutil = require('gulp-util');
// module to lighten keywords
var combiner = require('stream-combiner2');
// module to catch errors in compassing
var sourcemaps = require('gulp-sourcemaps');
// module to help debuging JavaScript & CSS files
var babel = require('gulp-babel');


gulp.task('script', function(){
	gulp.src('src/js/*.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(uglify())
		.on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
		.pipe(gulp.dest('js'));
});

gulp.task('style', function(){
	gulp.src('src/css/*.css')
		.pipe(minifyCSS())
		.pipe(gulp.dest('css'));
});

gulp.task('watchjs', function(){
	gulp.watch('src/js/**/*.js', function(event){
		var paths = watchPath(event, 'src', '');
		gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
		gutil.log(paths.distPath);

		combiner.obj([gulp.src(paths.srcPath)
			,sourcemaps.init()
			,babel({
				presets: ['es2015']
			})
			,uglify()
			,sourcemaps.write('./')
			,gulp.dest(paths.distDir)]).on('error', function(err){
				var colors = gutil.colors;
				console.log('\n');
				gutil.log(colors.red('Error!'));
				gutil.log('fileName: ' + colors.red(err.fileName));
				gutil.log('lineNumber: ' + colors.red(err.lineNumber));
				gutil.log('message: ' + err.message);
				gutil.log('plugin: ' + colors.yellow(err.plugin));
			});
	});
});

gulp.task('watchcss', function(){
	gulp.watch('src/css/**/*.css', function(event){
		var paths = watchPath(event, 'src', '');
		gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
		gutil.log(paths.distPath);

		combiner.obj([gulp.src(paths.srcPath)
		,sourcemaps.init()
		,minifyCSS()
		,sourcemaps.write('./')
		,gulp.dest(paths.distDir)]).on('error', function(err){
			var colors = gutil.colors;
			console.log('\n');
			gutil.log(colors.red('Error!'));
			gutil.log('fileName: ' + colors.red(err.fileName));
			gutil.log('lineNumber: ' + colors.red(err.lineNumber));
			gutil.log('message: ' + err.message);
			gutil.log('plugin: ' + colors.yellow(err.plugin));
		});
	});
});


gulp.task('auto', ['watchjs', 'watchcss']);
gulp.task('default', ['script', 'style', 'auto']);