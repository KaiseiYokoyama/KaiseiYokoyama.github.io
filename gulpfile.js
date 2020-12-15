let gulp = require('gulp');
let sass = require('gulp-sass');
let pug = require('gulp-pug');
const browserSync = require('browser-sync');

const src = {
    pug: ['src/pugs/**/*.pug', '!src/pugs/**/_*.pug'],
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js',
    img: 'src/img/*',
};

const out = {
    root: 'docs/',
    html: 'docs/',
    css: 'docs/css/',
    js: 'docs/js/',
    img: 'docs/images/',
};

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
gulp.watch(src.scss, scss);

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
gulp.watch(src.pug, compileHTML);

// Javascript
let js = () => {
    return gulp.src(src.js)
        .pipe(gulp.dest(out.js))
        .pipe(browserSync.reload({stream:true}));
};
exports.js = js;
gulp.watch(src.js, js);

// Image
let image = () => {
    return gulp.src(src.img)
        .pipe(gulp.dest(out.img))
        .pipe(browserSync.reload({stream:true}));
};
exports.image = image;
gulp.watch(src.img, image);

// サーバ
let serve = (done) => {
    browserSync({
        files: ["index.html"],
        port : 3010,
        server: {
            baseDir: out.root
        }
    });

    done();
};
exports.serve = serve;

// ファイル監視
exports.default = gulp.series(
    gulp.parallel(compileHTML,scss,js,image),
    serve,
);

