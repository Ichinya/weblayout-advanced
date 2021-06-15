const { src, dest, series, watch } = require('gulp')
const concat = require('gulp-concat')
const htmlMin = require('gulp-htmlmin')
const autoprefixes = require('gulp-autoprefixer')
const cleanCss = require('gulp-clean-css')
const image = require('gulp-image')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify-es').default
const notify = require('gulp-notify')
const coursemaps = require('gulp-sourcemaps')
const del = require('del')
const browserSync = require('browser-sync').create()

const clean = () => {
    return del(['dist'])
}

const styles = () => {
    return src('src/styles**/*.css')
        .pipe(coursemaps.init())
        .pipe(concat('main.css'))
        .pipe(autoprefixes({
            cascade: false
        }))
        .pipe(cleanCss({
            level: 2
        }))
        .pipe(coursemaps.write())
        .pipe(dest('dist'))
        .pipe(browserSync.stream())
}

const htmlMinify = () => {
    return src('src/**/*.html')
        .pipe(htmlMin({
            collapseWhitespace: true,
        }))
        .pipe(dest('dist'))
        .pipe(browserSync.stream())
}

const scripts = () => {
    return src([
            'src/js/components/**/*.js',
            'src/js/main.js'
        ])
        .pipe(coursemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('app.js'))
        .pipe(uglify({
            toplevel: true
        }).on('error', notify.onError()))
        .pipe(coursemaps.write())
        .pipe(dest('dist'))
        .pipe(browserSync.stream())
}

const images = () => {
    return src([
            'src/img/**/*.jpg',
            'src/img/**/*.jpeg',
            'src/img/**/*.png',
            'src/img/*.svg'
        ])
        .pipe(image())
        .pipe(dest('dist/img'))
}

const watchFiles = () => {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    })
}

watch('src/**/*.html', htmlMinify)
watch('src/styles/**/*.css', styles)
watch('src/js/**/*.js', scripts)

exports.styles = styles
exports.scripts = scripts
exports.htmlMinify = htmlMinify
exports.default = series(clean, htmlMinify, scripts, styles, images, watchFiles)


const stylesBuild = () => {
    return src('src/styles**/*.css')
        .pipe(concat('main.css'))
        .pipe(autoprefixes({
            cascade: false
        }))
        .pipe(cleanCss({
            level: 2
        }))
        .pipe(dest('dist'))
}

const scriptsBuild = () => {
    return src([
            'src/js/components/**/*.js',
            'src/js/main.js'
        ])
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('app.js'))
        .pipe(uglify({
            toplevel: true
        }).on('error', notify.onError()))
        .pipe(dest('dist'))
}



exports.build = series(clean, htmlMinify, scriptsBuild, stylesBuild, images, watchFiles)