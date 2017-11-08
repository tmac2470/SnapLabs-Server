const gulp = require('gulp');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const path = require('path');

const baseUrl = './client/';


gulp.task('watch', () => {
  gulp.watch([
    path.join(baseUrl, 'components/**/*.template.html')], ['angularjs-asset']);
  gulp.watch([
    path.join(baseUrl, 'components/')], ['angularjs']);
  gulp.watch([
    path.join(baseUrl, 'stylesheets/*.css')], ['css-asset']);
});

gulp.task('angularjs', () => {
  gulp.src([
    path.join(baseUrl, 'core/core.module.js'),
    path.join(baseUrl, 'core/core.config.js'),
    path.join(baseUrl, 'core/core.run.js'),
    path.join(baseUrl, 'core/auth/auth.module.js'),
    path.join(baseUrl, 'core/auth/auth.service.js'),
    path.join(baseUrl, 'components/about/about.module.js'),
    path.join(baseUrl, 'components/about/about.component.js'),
    path.join(baseUrl, 'components/auth/auth.module.js'),
    path.join(baseUrl, 'components/auth/auth-signup.component.js'),
    path.join(baseUrl, 'components/auth/auth-signin.component.js'),
    path.join(baseUrl, 'components/auth/auth-reset.component.js'),
    path.join(baseUrl, 'components/auth/auth-forget.component.js'),
    path.join(baseUrl, 'components/carousel/carousel.module.js'),
    path.join(baseUrl, 'components/carousel/carousel.component.js'),
    path.join(baseUrl, 'components/design/design.module.js'),
    path.join(baseUrl, 'components/design/design.component.js'),
    path.join(baseUrl, 'components/design/design-quick.component.js'),
    path.join(baseUrl, 'components/design/design-detail.component.js'),
    path.join(baseUrl, 'components/download/download.module.js'),
    path.join(baseUrl, 'components/download/download.component.js'),
    path.join(baseUrl, 'components/investigations/investigations.module.js'),
    path.join(baseUrl, 'components/investigations/investigations-list.component.js'),
    path.join(baseUrl, 'components/investigations/investigations-finder.component.js'),
    path.join(baseUrl, 'components/modal/modal.module.js'),
    path.join(baseUrl, 'components/modal/modal.controller.js'),
    path.join(baseUrl, 'components/modal/tune-modal.controller.js'),
    path.join(baseUrl, 'components/modal/investigation-modal.controller.js'),
    path.join(baseUrl, 'components/myworks/myworks.module.js'),
    path.join(baseUrl, 'components/myworks/myworks.component.js'),
    path.join(baseUrl, 'components/myworks/myworks-edit.component.js'),
    path.join(baseUrl, 'components/navigation/navigation.module.js'),
    path.join(baseUrl, 'components/navigation/navigation.component.js'),
    path.join(baseUrl, 'components/notification/notification.module.js'),
    path.join(baseUrl, 'components/notification/notification.component.js'),
    path.join(baseUrl, 'components/profile/profile.module.js'),
    path.join(baseUrl, 'components/profile/profile.component.js'),
    path.join(baseUrl, 'components/welcome/welcome.module.js'),
    path.join(baseUrl, 'components/welcome/welcome.component.js')])
    .pipe(concat('angularjs.min.js'))
    .pipe(gulp.dest('./public/javascripts/'));
});

gulp.task('angularjs-asset', () => {
  gulp.src([
    path.join(baseUrl, 'components/**/*.template.html')])
    .pipe(gulp.dest('./public/components'));
});

gulp.task('css-asset', () => {
  gulp.src([
    path.join(baseUrl, 'stylesheets/*.css')])
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('./public/stylesheets'))
    .pipe(cssmin().on('error', (err) => {
      console.log(err);
    }));
});

gulp.task('css-lib', () => {
  gulp.src([
    path.join(baseUrl, 'vendor/bootswatch-yeti.css'),
    path.join(baseUrl, 'vendor/angular-bootstrap-toggle.css')])
    .pipe(concat('css-lib.css'))
    .pipe(cssmin().on('error', (err) => {
      console.log(err);
    }))
    .pipe(rename('css-lib.min.css'))
    .pipe(gulp.dest('./public/stylesheets/'));
});

gulp.task('js-lib', () => {
  gulp.src([
    path.join(baseUrl, 'vendor/jquery.js'),
    path.join(baseUrl, 'vendor/jquery-ui.js'),
    path.join(baseUrl, 'vendor/angular.js'),
    path.join(baseUrl, 'vendor/angular-ui-router.js'),
    path.join(baseUrl, 'vendor/angular-animate.js'),
    path.join(baseUrl, 'vendor/angular-sanitize.js'),
    path.join(baseUrl, 'vendor/angular-bootstrap-toggle.js'),
    path.join(baseUrl, 'vendor/ui-bootstrap-tpls.js'),
    path.join(baseUrl, 'vendor/sortable.js')])
    .pipe(concat('js-lib.min.js'))
    .pipe(gulp.dest('./public/javascripts/'));
});

gulp.task('default', ['css-lib', 'js-lib', 'angularjs', 'angularjs-asset', 'css-asset']);


gulp.task('dev', ['css-lib', 'js-lib', 'angularjs', 'angularjs-asset', 'css-asset', 'watch']);
