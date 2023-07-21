const gulp = require('gulp')
const cleanCSS = require('gulp-clean-css')
const uglify = require('gulp-uglify')
const autoprefixer = require('gulp-autoprefixer')
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create()

gulp.task('clone-files', async () => {
	return gulp.src(['app/**/*', '!app/**/*.js', '!app/**/*.css'])
		.pipe(gulp.dest('public/'))
		.on('error', function(err) {
			console.log(err.message);
			this.emit('end');
		})
})

gulp.task('minify-css', async () => {
	return gulp.src('app/**/*.css')
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 99 versions'],
			cascade: false
		}))
		.pipe(cleanCSS())
		.on('error', function(err) {
			console.log(err.message);
			this.emit('end');
		})
		.pipe(rename(path => {
			path.basename += ".min"
		}))
		.pipe(gulp.dest('public/'))
})

gulp.task('minify-js', async () => {
	return gulp.src('app/**/*.js')
		.pipe(uglify())
		.on('error', function(err) {
			console.log(err.message);
			this.emit('end');
		})
		.pipe(rename(path => {
			path.basename += ".min"
		}))
		.pipe(gulp.dest('public/'))
})

gulp.task('server', async () => {
	browserSync.init({
		server: 'public'
	})
	browserSync.watch('public/**/*').on('change', browserSync.reload)
})

gulp.task('watch-files', async () => {
	gulp.watch('app/**/*.css', gulp.series('minify-css'))
	gulp.watch('app/**/*.js', gulp.series('minify-js'))
	gulp.watch('app/**/*.html', gulp.series('clone-files'))
})

gulp.task('build', gulp.series('minify-css', 'minify-js'))
gulp.task('default', gulp.parallel('watch-files', 'server'))