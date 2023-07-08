import gulp from 'gulp';
const { src, dest, series, parallel } = gulp;
import browserSync from 'browser-sync';
import fileInclude from 'gulp-file-include';
import { deleteAsync } from 'del';
import sass from 'gulp-sass';
import * as nodeSass from 'sass'
import autoprefixer from 'gulp-autoprefixer';
import group_media from 'gulp-group-css-media-queries';
import clean_css from 'gulp-clean-css';
import rename from 'gulp-rename';
import uglifyEs from 'gulp-uglify-es';
const uglify = uglifyEs.default;
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import panini from 'panini';
import babel from 'gulp-babel';
import imagemin from 'gulp-imagemin';
import gifsicle from 'imagemin-gifsicle';
import mozjpeg from 'imagemin-mozjpeg';
import optipng from 'imagemin-optipng';
import svgo from 'imagemin-svgo';
import htmlMin from 'gulp-htmlmin';
import ttf2woff2 from 'gulp-ttf2woff2';

const distPath = 'dist/'
const srcPath = 'src/'

const path = {
    build: {
        html: distPath + '/',
        css: distPath + '/css/',
        js: distPath + '/js/',
        img: distPath + '/img/',
        fonts: distPath + '/fonts/',
    },
    src: {
        html: srcPath + 'views/pages/**/*.html',
        css: srcPath + 'assets/scss/styles.scss',
        js: srcPath + 'assets/js/**/*.js',
        img: srcPath + 'assets/img/**/*.{jpg,png,svg,gif,ico,webp}',
        fonts: srcPath + 'assets/fonts/*.ttf',
    },

    watch: {
        html: srcPath + '{data,views}/**/*',
        css: srcPath + 'assets/scss/**/*.scss',
        js: srcPath + 'assets/js/**/*.js',
        img: srcPath + 'assets/img/**/*.{jpg,png,svg,gif,ico,webp}'
    },

    clean: './' + distPath + '/**/*',
}

const scss = sass(nodeSass); 

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
            imagemin([
                gifsicle({ interlaced: true }),
                mozjpeg({ quality: 100, progressive: true }),
                optipng({ optimizationLevel: 3 }),
                svgo(),
            ])
        )
        .pipe(dest(path.build.img))
        .pipe(browserSync.stream())
}

function fonts() {
    return src(path.src.fonts)
        .pipe(ttf2woff2())
        .pipe(dest(path.build.fonts))
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
    return deleteAsync(path.clean)
}

let build = series(
    clean,
    parallel(
        js,
        css,
        html,
        images,
        fonts
    )
)
let build_prod = series(
    clean,
    parallel(
        js,
        css,
        html,
        images,
        fonts
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

export default watch
export { build, build_prod }
