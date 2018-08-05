var gulp = require('gulp');
const gulpServerIo = require('gulp-server-io');

/**
* Location where to store the 3rd party libraries
*/
var frontend_folder="./www/assets"
var vendor_folder=`${frontend_folder}/vendor`

/**
* Where NON 3rd party libs to get stored`
*/
var frontent_dev_folder_js=`${frontend_folder}/js`
var frontent_dev_folder_js=`${frontend_folder}/css`

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
  var path='./node_modules/@fortawesome/fontawesome-free-webfonts';
  var dest=vendor_folder+'/font-awesome';

  gulp.src(path+'/webfonts/*').pipe(gulp.dest(dest+'/webfonts'));
  gulp.src(path+'/css/fontawesome.css').pipe(gulp.dest(dest+'/css'));

  done();
});


/* ############################################ Main tasks ##################################### */

gulp.task('move_frontend', gulp.series(['move_bootstrap','move_jquery','move_fontawesome'],(done)=>{done()}));
gulp.task('dev',gulp.series(['move_frontend'],(done)=>{
    gulp.src(['./www']).pipe(gulpServerIo({
      port: 8880,
      indexes: ['index.html'],
      open: true
    }));
    done();
}));

gulp.task('default',gulp.series(['dev'],(done)=>{done()}));
