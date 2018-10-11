//gulp 的插件
//http插件（服务器插件）
// gulp connect
const gulp=require("gulp");
//服务器插件
const connect =require("gulp-connect");
//合并插件
const concat=require('gulp-concat');
//压缩插件
var uglify=require("gulp-uglify");
//babel
var babel=require("gulp-babel");
//css插件
var cleanCss=require("gulp-clean-css")


gulp.task('connect',function(){
    connect.server({
    //    port:8888,
       root:"dist/",livereload:true,
       middleware:function(connect,opt){
        //    console.log(opt)
           var Proxy=require('gulp-connect-proxy');
           opt.route='/proxy';
           var proxy=new Proxy(opt);
           return[proxy];
       }
        
    })
});
gulp.task("html",()=>{
    return gulp.src("*.html").pipe(gulp.dest("dist/")).pipe(connect.reload());;
})
gulp.task("css",()=>{
    return gulp.src(["css/*.css"]).pipe(cleanCss()).pipe(gulp.dest("dist/css"))
})
gulp.task("watch",()=>{
    gulp.watch("index.html",["html"]);
})
gulp.task("default",["watch","connect"]);

 
//script转存指令
gulp.task("script",()=>{
    return gulp.src(["script/app/*.js","script/libs/*.js","script/module/*.js"]).pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/script"));
})
//编译es6-es5
gulp.task("es6",()=>{
    return gulp.src("script/es2015/*.js")
    .pipe(babel({
        presets:['@babel/env']
    }))
    .pipe(gulp.dest("dist/script"));
})