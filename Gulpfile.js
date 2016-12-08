var gulp                  = require('gulp'),
    // Recursos para servidor web
    connect               = require('gulp-connect'),
    historyApiFallback    = require('connect-history-api-fallback'),
    // Recursos para stylus
    stylus                = require('gulp-stylus'),
    nib                   = require('nib'),
    rupture               = require('rupture'),
    // Recursos para javascript
    jshint                = require('gulp-jshint'),
    stylish               = require('jshint-stylish'),
    // Recursos para inyectar librerias
    inject                = require('gulp-inject'),
    wiredep               = require('wiredep').stream,
    angularFilesort       = require('gulp-angular-filesort'),
    // Recursos para producción
    templateCache         = require('gulp-angular-templatecache')
    gulpif                = require('gulp-if')
    minifyCss             = require('gulp-minify-css')
    useref                = require('gulp-useref')
    uglify                = require('gulp-uglify'),
    uncss                 = require('gulp-uncss');


// Elimina css no utilizado
gulp.task('uncss', function () {
  gulp.src('./dist/css/style.min.css')
    .pipe(uncss({
      html: [
        './app/**/*.html'
      ]
    }))
    .pipe(gulp.dest('./dist/css'));
});


// Crea un bundle de css y javascript
gulp.task('compress', function () {
  gulp.src('./app/index.html')
    .pipe(useref())
    // .pipe(gulpif('*.js', uglify({
    //   preserveComments: 'license',
    //   compress: false
    // })))
    .pipe(gulpif('*.js', uglify({
      mangle: false
    })))
    .pipe(gulpif('*.css', minifyCss()))
    .pipe(gulp.dest('./dist'));
});


// Pasa index.html con los bundles inyectados
gulp.task('copy', function () {
  gulp.src('./app/index.html')
    .pipe(useref())
    .pipe(gulp.dest('./dist'));

  gulp.src('./app/lib/font-awesome/fonts/**')
    .pipe(gulp.dest('./dist/fonts'));

  gulp.src('./app/img/**')
    .pipe(gulp.dest('./dist/img'));

  gulp.src('./app/partials/**')
    .pipe(gulp.dest('./dist/partials'));
});


// Crea un bundle de todos los templates que se usan en Angular
gulp.task('templates', function () {
  gulp.src('./app/partials/**/*.tpl.html')
    .pipe(templateCache({
      root: 'partials/',
      module: 'blog.templates',
      standalone: true
    }))
    .pipe(gulp.dest('./app/scripts'));
});


// Busca en las carpetas de estilos y javascript los archivos que hayamos creado
// para inyctarlos en el index.html
gulp.task('inject', function () {
  return gulp.src('index.html', {cwd: './app'})
    .pipe(inject(
      gulp.src(['./app/js/**/*.js']).pipe(angularFilesort()),
      {
        ignorePath: '/app'
      }
    ))
    .pipe(inject(
      gulp.src(['./app/css/**/*.css']),
      {
        ignorePath: '/app'
      }
    ))
    .pipe(gulp.dest('./app'))
});


// Inyecta las librerías que instalamos vía Bower
gulp.task('wiredep', function () {
  gulp.src('./app/index.html')
    .pipe(wiredep({
      directory: './app/lib',
      devDependencies: true
    }))
    .pipe(gulp.dest('./app'));
});


// Servidor web de desarrollo
gulp.task('server', function () {
  connect.server({
    root: './app',
    hostname: '0.0.0.0',
    port: 8080,
    livereload: true,
    middleware: function(connect, opt) {
      return [ historyApiFallback({}) ];
    }
  });
});


// Servidor web de producción
gulp.task('server-dist', function () {
  connect.server({
    root: './dist',
    hostname: '0.0.0.0',
    port: 8080,
    livereload: true,
    middleware: function(connect, opt) {
      return [ historyApiFallback({}) ];
    }
  });
});


// Busca errores en el JS y nos los muestra por pantalla
gulp.task('jshint', function () {
  return gulp.src('./app/js/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});


// Preprocesa archivos Stylus a CSS y recarga los cambios
gulp.task('css', function () {
  gulp.src('./app/css/main.styl')
    .pipe(stylus({
      use: [nib(), rupture()]
    }))
    .pipe(gulp.dest('./app/css'))
    .pipe(connect.reload());
});


// recarga el navegador cuando hay cambios en el HTML
gulp.task('html', function () {
  gulp.src('./app/**/*.html')
    .pipe(connect.reload());
});


// Vigila cambios que se produzcan en el código
// y lanza las tareas relacionadas
gulp.task('watch', function () {
  gulp.watch(['./app/**/*.html'], ['html']);
  gulp.watch(['./app/css/**/*.styl'], ['css', 'inject']);
  gulp.watch(['./app/js/**/*.js', 'Gulpfile.js'], ['jshint', 'inject']);
  gulp.watch(['./bower.json'], ['wiredep']);
});


// Tarea que ejecuta procesos para producción
gulp.task('build', ['compress', 'copy', 'uncss']);
// gulp.task('build', ['templates', 'compress', 'copy', 'uncss']);


gulp.task('default', ['server', 'inject', 'wiredep', 'watch']);
