var gulp = require('gulp');
const gulpServerIo = require('gulp-server-io');
const uglify = require('gulp-uglify');
const minifyJS = require('gulp-minify');
const minifyCss = require('gulp-minify-css');
const rename = require('gulp-rename');
const fs   = require('fs');
const sass = require('gulp-sass');


const frontend_folder="./www/assets";
const vendor_folder=`${frontend_folder}/vendor`;
const release_folder='./vendor';
const serve_production_location='./www-prod';

/**
* Where theme's javascript and css is located
*/
const frontent_dev_folder_js=`${frontend_folder}/js`
const frontent_dev_folder_css=`${frontend_folder}/css`
const frontend_dev_folder_saas=`${frontend_folder}/saas`

const frontend_prod_folder_sass=`${serve_production_location}/css`
/*################################### Installing Dependencies ###############################*/

//Move Bootstrap
gulp.task('move_bootstrap',function(done){

  var bootstrap_dir='./node_modules/bootstrap/dist';
  var dest=`${vendor_folder}/bootstrap`;

  var css_files=[`${bootstrap_dir}/css/bootstrap.min.css`,`${bootstrap_dir}/css/bootstrap.min.css.map`];
  var js_files=[`${bootstrap_dir}/js/bootstrap.bundle.min.js`,`${bootstrap_dir}/js/bootstrap.bundle.min.js.map`];

  gulp.src(css_files).pipe(gulp.dest(`${dest}/css`));
  gulp.src(js_files).pipe(gulp.dest(`${dest}/js`));

  done();
})

//Jquery & miscellanous Javascript move
gulp.task('move_jquery',function(done){
  var jqueryFiles=['./node_modules/jquery/dist/jquery.min.js','./node_modules/jquery-ui-dist/jquery-ui.min.css','./node_modules/jquery-ui-dist/jquery-ui.min.js'];
  gulp.src(jqueryFiles).pipe(gulp.dest(vendor_folder));

  done();
});

//For fontawesome
gulp.task('move_fontawesome',function(done){
  var path='./node_modules/@fortawesome/fontawesome-free';
  var dest=vendor_folder+'/font-awesome';

  gulp.src(path+'/webfonts/*').pipe(gulp.dest(dest+'/webfonts'));
  gulp.src(path+'/css/*.min.css').pipe(gulp.dest(dest+'/css'));

  done();
});

gulp.task('move_responsive_utils',function(done){
  var path="./node_modules/responsive-toolkit/dist/bootstrap-toolkit.min.js";
  gulp.src(path).pipe(gulp.dest(vendor_folder));
  done();
})

gulp.task('minify',function(done){
  gulp.src(`${frontent_dev_folder_js}/panel.js`).pipe(minifyJS()).pipe(uglify({mangle: false})).pipe(gulp.dest(release_folder));
  done();
});

//Saas
gulp.task('move_saas_deps',function(done){
  var deps=[
    'node_modules/bootstrap/scss/_variables.scss',
    'node_modules/bootstrap/scss/mixins/_breakpoints.scss'
  ];
  gulp.src(deps).pipe(gulp.dest(`${frontend_dev_folder_saas}/includes`));
  done();
});

gulp.task('sass',function (done) {
  gulp.src(`${frontend_dev_folder_saas}/*.scss`)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(frontent_dev_folder_css));

  done();
});

gulp.task('saas_minified',function(done){

  if(!fs.existsSync(frontend_prod_folder_sass)){
    fs.mkdirSync(frontend_prod_folder_sass),
    console.log('📁  folder created:', frontend_prod_folder_sass);
  }

  gulp.src(`${frontend_dev_folder_saas}/*.scss`)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest(frontend_prod_folder));
})

gulp.task('sass:watch', function (done) {
  gulp.watch(`${frontend_dev_folder_saas}/*.scss`, gulp.series(['sass']));
  done();
});

/* ############################################ Main tasks ##################################### */

gulp.task('move_frontend', gulp.series(['move_bootstrap','move_jquery','move_fontawesome','move_responsive_utils','move_saas_deps'],(done)=>{done()}));

gulp.task('make_frontend',gulp.series(['move_frontend','sass']),(done)=>{done()});

gulp.task('dev',gulp.series(['make_frontend','sass:watch'],(done)=>{
    gulp.src(['./www']).pipe(gulpServerIo({
      port: 8880,
      indexes: ['index.html'],
      open: true
    }));
    done();
}));

gulp.task('prod',gulp.series(['move_bootstrap','move_jquery','move_fontawesome','minify'],(done)=>{

  //Create a production-only www
  if(!fs.existsSync(serve_production_location)){
    fs.mkdirSync(serve_production_location),
    console.log('📁  folder created:', serve_production_location);
  }

  gulp.src('./www/*.html').pipe(gulp.dest(serve_production_location));
  gulp.src('./www/icons/**').pipe(gulp.dest(`${serve_production_location}/icons`));
  gulp.src(`${vendor_folder}/**`).pipe(gulp.dest(`${serve_production_location}/assets/vendor/`));
  gulp.src(`${release_folder}/panel-min.js`).pipe(rename('panel.js')).pipe(gulp.dest(`${serve_production_location}/assets/js/`));
  gulp.src(`${release_folder}/panel.min.css`).pipe(rename('panel.css')).pipe(gulp.dest(`${serve_production_location}/assets/css/`));

  //Serve files
  gulp.src(serve_production_location).pipe(gulpServerIo({
    port: 8881,
    indexes: ['index.html'],
    open: true
  }));

  done();
}))

gulp.task('default',gulp.series(['dev'],(done)=>{done()}));
