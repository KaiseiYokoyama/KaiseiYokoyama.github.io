let gulp = require('gulp');
let sass = require('gulp-sass')(require('sass'));
let pug = require('gulp-pug');
const browserSync = require('browser-sync');

const src = {
    pug: ['src/pugs/**/*.pug', '!src/pugs/**/_*.pug'],
    scss: 'src/assets/scss/**/*.scss',
    js: 'src/assets/js/**/*.js',
    img: 'src/assets/img/**/*',
    movie: 'src/assets/movie/**/*',
};

const out = {
    root: 'docs/',
    html: 'docs/',
    css: 'docs/css/',
    js: 'docs/js/',
    img: 'docs/images/',
    movie: 'docs/movie/',
};

// ブラウザ同期
let sync = (done) => {
    browserSync.reload();
    done();
};
exports.sync = sync;

// SCSS
let scss = () => {
    return gulp.src(src.scss)
        .pipe(
            sass({ outputStyle: 'expanded' })
            .on("error", sass.logError)
        )
        .pipe(gulp.dest(out.css))
        .pipe(browserSync.reload({stream:true}));
};
exports.scss = scss;
gulp.watch(src.scss, gulp.series(scss,sync));

// PUG
let compileHTML = () => {
    return gulp.src(src.pug)
        .pipe(
            pug({pretty: true})
            // .on("error", pug.logError)
        )
        .pipe(gulp.dest(out.html))
        .pipe(browserSync.reload({stream:true}));
};
exports.pug = compileHTML;
gulp.watch(src.pug, gulp.series(compileHTML,sync));

// Javascript
let js = () => {
    return gulp.src(src.js)
        .pipe(gulp.dest(out.js))
        .pipe(browserSync.reload({stream:true}));
};
exports.js = js;
gulp.watch(src.js, gulp.series(js,sync));

// Image
let image = () => {
    return gulp.src(src.img)
        .pipe(gulp.dest(out.img))
        .pipe(browserSync.reload({stream:true}));
};
exports.image = image;
gulp.watch(src.img, gulp.series(image,sync));

// Movie
let movie = () => {
    return gulp.src(src.movie)
        .pipe(gulp.dest(out.movie))
        .pipe(browserSync.reload({stream:true}));
};
exports.movie = movie;
gulp.watch(src.img, gulp.series(movie,sync));

// サーバ
let serve = (done) => {
    browserSync({
        files: ["index.html"],
        port : 3010,
        server: {
            baseDir: out.root
        },
        reloadOnRestart: true,
    });

    done();
};
exports.serve = serve;

// ファイル監視
exports.default = gulp.series(
    gulp.parallel(compileHTML,scss,js,image,movie),
    serve,
);

