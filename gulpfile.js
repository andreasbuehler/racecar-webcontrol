const gulp = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const plumber = require('gulp-plumber');
const server = require('pushstate-server');

gulp.task('develop', develop);

function develop() {
    server.start({
        port: 3000,
        directory: './'
    });
    return gulp.watch('./src/**/*.js', () => {
        gulp.src('./src/**/*.js')
            .pipe(plumber())
            .pipe(concat('app.js'))
            .pipe(gulp.dest('./dist'));
    });
}
