(function() {
  'use strict';


  /*Splash time life*/
  setTimeout(function asyncBootstrap() {
    angular.bootstrap( document, [ 'Csi' ] );
  },( 2 * 1000 ));


  /*Config*/
  var Router = function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: '../partials/login/login.tpl.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .state('home', {
        url: '/home',
        templateUrl: '../partials/home/home.tpl.html',
        controller: 'HomeCtrl',
        controllerAs: 'home'
      })
      .state('map', {
        url: '/map',
        templateUrl: '../partials/map/map.tpl.html',
        controller: 'MapCtrl',
        controllerAs: 'map'
      })

      /*hardcode routes*/
      .state('travelList', {
        url: '/travel-list',
        templateUrl: '../partials/hardcode/travellist.html'
      })
      .state('travelDetail', {
        url: '/travel-detail',
        templateUrl: '../partials/hardcode/traveldetail.html'
      })
      .state('carDetail', {
        url: '/car-detail',
        templateUrl: '../partials/hardcode/cardetail.html'
      })
      .state('config', {
        url: '/config',
        templateUrl: '../partials/hardcode/configuration.html'
      });

      $urlRouterProvider.otherwise('/login');

  };

  /*Angular Material Theme*/
  var MaterialTheme = function ($mdThemingProvider) {

    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('blue');

  };

  /*Map*/
  // var GoogleMapsSDK = function (uiGmapGoogleMapApiProvider) {
  //
  //   uiGmapGoogleMapApiProvider.configure({
  //       key: 'AIzaSyAJvY82_U9tt7fbcB4MvgN3Q2xHH5OkZCM',
  //       v: '3.20', //defaults to latest 3.X anyhow
  //       libraries: 'weather,geometry,visualization'
  //   });
  //
  // };


  /*Run*/
  var Authentication = function ($rootScope, AuthService) {

    $rootScope.$on('$stateChangeSuccess', function(evt) {
      evt.preventDefault();
      AuthService.authenticateUser();
    });

  };
  Authentication.$inject = ['$rootScope', 'AuthService'];


  angular.module('Csi', [
    'ngMaterial',
    'ngAnimate',
    'ui.router',
    'ngMessages',
    'angularMoment',
    'angular-storage',
    'Csi.login',
    'Csi.home',
    'Csi.map',
    'Csi.common'
  ])
  .value('AccessToken', {
    key: null
  })
  .config(Router)
  .config(MaterialTheme)
  // .config(GoogleMapsSDK)
  .run(Authentication);

}());
