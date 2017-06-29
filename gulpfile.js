 'use strict';
 var gulp = require('gulp');
 var uglify = require('gulp-uglify'); //压缩js
 var minify = require('gulp-minify-css'); //css压缩
 var minifyHtml = require('gulp-minify-html'); //html压缩
 var jshint = require('gulp-jshint'); //检查js代码是否正确
 var concat = require('gulp-concat'); // 合并css/js代码 减少http请求
 var imagemin = require('gulp-imagemin');  //压缩图片  第一个插件
 var imageminpng = require('imagemin-pngquant');//压缩图片 png图片
 var browserSync = require('browser-sync');//  记载异步刷新文件
 var reload = browserSync.reload; // 加载reload 文件
 gulp.task('myfisttest', function() {
     gulp.src(['src/src/*.js'])
         .pipe(concat('all.js'))
         .pipe(gulp.dest('src/src'));
     gulp.src(['src/src/*.js'])
         .pipe(uglify())
         .pipe(gulp.dest('dist/src'));
    //  gulp.src(['dist/src/*.js'])
    //      .pipe(jshint())
    //      .pipe(jshint.reporter());
 });
 gulp.task('secondtask', function() {
     gulp.src(['src/src/*.css'])
         .pipe(minify())
         .pipe(gulp.dest('dist/src'))
         .pipe(reload({stream:true}));   
 });
 gulp.task('third', function() {
     gulp.src(['src/mian/*.html'])
         .pipe(minifyHtml())
         .pipe(gulp.dest('dist/mian'));
 });
 gulp.task('image', function() {
     gulp.src(['src/image/*.png'])
         .pipe(imagemin({
             progressive: true,
             use: [imageminpng()]
         }))
         .pipe(gulp.dest('dist/images'));
 });
 //gulp.task('default', ['myfisttest', 'secondtask', 'third', 'image','server']);
 gulp.task('server',function(){
        browserSync.init({
            server:{
                baseDir:'dist',
                index:'mian/index.html'
            }
        });
        gulp.watch('src/src/*.js',['myfisttest']);
        gulp.watch('src/src/*.css',['secondtask']);
        //表示html刷新  必须在css里面重新渲染
        gulp.watch('src/mian/*.html',['third']).on('change',reload);
        //表示html直接刷新
 });
 gulp.task('default',['server']);