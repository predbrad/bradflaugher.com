const distPath = 'dist/'
const srcPath = 'src/'

const path = {
    build: {
        html: distPath + '/',
        css: distPath + '/css/',
        js: distPath + '/js/',
        img: distPath + '/img/'
    },
    src: {
        html: srcPath + 'views/pages/**/*.html',
        css: srcPath + 'assets/scss/styles.scss',
        js: srcPath + 'assets/js/**/*.js',
        img: srcPath + 'assets/img/**/*.{jpg,png,svg,gif,ico,webp}'
    },

    watch: {
        html: srcPath + '{data,views}/**/*',
        css: srcPath + 'assets/scss/**/*.scss',
        js: srcPath + 'assets/js/**/*.js',
        img: srcPath + 'assets/img/**/*.{jpg,png,svg,gif,ico,webp}'
    },

    clean: './' + distPath + '/',
}

const {
    src,
    dest,
    series,
    parallel
} = require('gulp')
const gulp = require('gulp')


const browserSync = require('browser-sync')

const fileInclude = require('gulp-file-include')
const del = require('del')
const scss = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const group_media = require('gulp-group-css-media-queries')
const clean_css = require('gulp-clean-css')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify-es').default
const notify = require('gulp-notify')
const plumber = require('gulp-plumber')
const panini = require('panini')
const babel = require('gulp-babel')
const imageMin = require('gulp-imagemin')
const htmlMin = require('gulp-htmlmin');

function browserSyncF() {
    browserSync.init({
        server: {
            baseDir: distPath,
            index: "index.html"
        },
        port: 3000,
        notify: false,
    })
}

function html() {
    return (
        src(path.src.html)
            .pipe(plumber())
            .pipe(
                panini({
                    root: srcPath,
                    layouts: srcPath + 'views/layouts/',
                    partials: srcPath + 'views/partials/',
                    helpers: srcPath + 'views/helpers/',
                    data: srcPath + 'data/',
                    pageLayouts: {
                        // All pages inside src/pages/blog will use the blog.html layout
                        // 'blog': 'blog'
                    }
                })
            )
            .pipe(fileInclude())
            .pipe(dest(path.build.html))
            .pipe(browserSync.stream())
    )
}

function htmlMinimize () {
    return gulp.src(path.build.html + '*.html')
        .pipe(htmlMin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(dest(path.build.html));
}

function paniniRefresh() {
    return panini.refresh()
}

function css() {
    return src(path.src.css)
        .pipe(
            plumber({
                errorHandler: function (err) {
                    notify.onError({
                        title: 'SCSS Error',
                        message: 'Error: <%= error.message %>',
                    })(err)
                    this.emit('end')
                },
            })
        )
        .pipe(scss({ outputStyle: 'expanded' }))
        .pipe(group_media())
        .pipe(
            autoprefixer({
                overrideBrowserslist: ['last 5 versions', 'ie >= 10'],
                cascade: true,
                grid: 'autoplace'
            })
        )
        .pipe(dest(path.build.css))
        .pipe(clean_css())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(dest(path.build.css))
        .pipe(browserSync.stream())
}

function js() {
    return src(path.src.js)
        .pipe(
            plumber({
                errorHandler: function (err) {
                    notify.onError({
                        title: 'JS Error',
                        message: 'Error: <%= error.message %>',
                    })(err)
                    this.emit('end')
                },
            })
        )
        .pipe(fileInclude())
        .pipe(plumber())
        .pipe(
            babel({
                presets: ['@babel/env'],
            })
        )
        .pipe(dest(path.build.js))
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(dest(path.build.js))
        .pipe(browserSync.stream())
}

function images() {
    return src(path.src.img)
        .pipe(dest(path.build.img))
        .pipe(src(path.src.img))
        .pipe(
            imageMin([
                imageMin.gifsicle(
                    { interlaced: true }
                ),
                imageMin.mozjpeg(
                    { quality: 75, progressive: true }
                ),
                imageMin.optipng(
                    { optimizationLevel: 5 }
                ),
                imageMin.svgo({
                    plugins: [
                        { removeViewBox: true }, { cleanupIDs: false }
                    ],
                }),
            ])
        )
        .pipe(dest(path.build.img))
        .pipe(browserSync.stream())
}

function watchFiles(cb) {
    gulp.watch([path.watch.css], css)
    gulp.watch([path.watch.js], js)
    gulp.watch([path.watch.img], images)

    gulp
        .watch(path.watch.html)
        .on('change', gulp.series(
            async () => { paniniRefresh() },
            html
            )
        );

    cb()
}

function clean() {
    return del(path.clean)
}

let build = series(
    clean,
    parallel(
        js,
        css,
        html,
        images
    )
)
let build_prod = series(
    clean,
    parallel(
        js,
        css,
        html,
        images
    ),
    htmlMinimize
)
let watch = series(
    parallel(
        build ,
        watchFiles
    ),
    browserSyncF
)

exports.clean = clean
exports.js = js
exports.css = css
exports.html = html
exports.build = build
exports.build = build_prod
exports.default = watch