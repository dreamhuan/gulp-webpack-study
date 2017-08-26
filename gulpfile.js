var gulp = require('gulp');
var sass = require('gulp-sass');//编译sass
var less = require('gulp-less');//编译less
var autoprefixer = require('gulp-autoprefixer');//前缀补全
var minifycss = require('gulp-minify-css');//压缩css
var imagemin = require('gulp-imagemin');//img压缩
var rename = require('gulp-rename');//重命名
var clean = require('gulp-clean');//清除
var cache = require('gulp-cache');//缓存img,构建有变更的img
var fileinclude = require('gulp-file-include');//文件引入
var gulp_webpack = require('gulp-webpack');
var webpack = require('webpack');
browserSync = require('browser-sync').create();//server服务

// 清理
gulp.task('clean', function () {
    return gulp.src(['dist/app', 'dist/css', 'dist/font', 'dist/img', 'dist/js', 'dist/lib'], {read: false})
        .pipe(clean());
});

//html模板编译
gulp.task('html', function () {
    return gulp.src('src/app/**/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        // .pipe(rename({suffix: '.tpl'}))
        .pipe(gulp.dest('dist/app/'));
});

// 编译压缩less
gulp.task('styles', function () {
    return gulp.src('src/css/*.less')
        .pipe(less())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('dist/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css'));
});


// // 编译压缩sass
// gulp.task('styles', function () {
//     return gulp.src('src/css/*.scss')
//         .pipe(sass())
//         .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
//         .pipe(gulp.dest('dist/css'))
//         .pipe(rename({suffix: '.min'}))
//         .pipe(minifycss())
//         .pipe(gulp.dest('dist/css'));
// });


//用webpack处理js 顺便插入到相应html中，所以需要html任务执行完毕
gulp.task('scripts', ['html', 'styles'], function (callback) {
    return gulp.src(['src/js/*.js', 'dist/css/*.css'])
        .pipe(gulp_webpack(require('./webpack.config.js'), webpack))
        .pipe(gulp.dest('dist/js'));
});

// 图片
gulp.task('images', function () {
    return gulp.src('src/img/**/*')
        .pipe(cache(imagemin({optimizationLevel: 3, progressive: true, interlaced: true})))
        .pipe(gulp.dest('dist/img'));
});

// font 只是简单的转移
gulp.task('fonts', function () {
    return gulp.src('src/font/**/*')
        .pipe(gulp.dest('dist/font'));
});

// lib 转移
gulp.task('lib', function () {
    return gulp.src('src/lib/**/*')
        .pipe(gulp.dest('dist/lib'));
});

//默认任务
gulp.task('default', ['html', 'styles', 'scripts', 'images', 'fonts', 'lib'], function () {

    //初始化browserSync
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    //监听文件变化实时编译
    gulp.watch('src/css/**/*.less', ['styles']);
    gulp.watch('src/img/**/*', ['images']);
    gulp.watch('src/app/**/*.html', ['scripts']);
    gulp.watch('src/js/**/*.js', ['scripts']);

    //监听当dist文件夹下任何文件发生变化，则自动刷新浏览器
    gulp.watch('./dist/**', function () {
        console.log('reload');
        browserSync.reload();
    });
});


gulp.task('build', ['clean'], function () {
    gulp.run('html', 'styles', 'scripts', 'images', 'fonts', 'lib');
});
