const gulp = require('gulp')
const del = require('del')
const postcss = require('gulp-postcss')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const rename = require('gulp-rename')
const concat = require('gulp-concat')
const rev = require('gulp-rev')
const revCollector = require('gulp-rev-collector')
const imagemin = require('gulp-imagemin')

// const uglify = require('gulp-uglify')

gulp.task('clean', function() {
    return del(['./dist'])
})

// gulp.task('copy-images', function() {
//     return gulp.src('./src/statics/images/*')
//         .pipe(gulp.dest('./dist/statics/images'))
// })

gulp.task('images', function() {
    gulp.src('./src/statics/images/*.*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('./dist/statics/images'))
})


gulp.task('clean-styles', function() {
    return del(['./dist/statics/styles'])
})

gulp.task('styles', function() {
    const processors = [
        autoprefixer({
            browsers: ['last 15 version', 'ie 9']
        }),
        cssnano()
    ]
    return gulp.src(['./node_modules/normalize.css/normalize.css', './src/statics/styles/index.css'])
        .pipe(concat('main.css'))
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(rev())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/statics/styles/'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./dist/rev/'))
})

gulp.task('rev-collector', ['styles'], function() {
    return gulp.src(['./dist/rev/*.json', './src/views/**/*.html'])
        .pipe(revCollector({
            replaceReved: true
        }))
        .pipe(gulp.dest('./dist/views'))
})

gulp.task('watch', function() {
    var watch_styles = gulp.watch(['./src/views/**/*.html', './src/statics/styles/*.css'], ['clean-styles', 'rev-collector'])
    watch_styles.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...')
    })
})

gulp.task('build', ['images', 'rev-collector'])
    // gulp.task('build', ['copy-images', 'rev-collector'])

gulp.task('default', ['clean'])
