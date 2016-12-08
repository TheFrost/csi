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
      .state('travelDetail', {
        url: '/travel-detail/:travelId',
        templateUrl: '../partials/hardcode/traveldetail.html',
        controller: 'TravelDetailCtrl',
        controllerAs: 'travelDetail'
      })
      .state('vehicleDetail', {
        url: '/vehicle-detail/:vehicleVin',
        templateUrl: '../partials/hardcode/cardetail.html',
        controller: 'VehicleDetailCtrl',
        controllerAs: 'vehicleDetail'
      })
      .state('config', {
        url: '/config',
        templateUrl: '../partials/hardcode/configuration.html'
      })

      /*hardcode routes*/
      .state('travelList', {
        url: '/travel-list',
        templateUrl: '../partials/hardcode/travellist.html'
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
    'anim-in-out',
    'ui.router',
    'ngMessages',
    'angularMoment',
    'angular-storage',
    'bc.Flickity',
    'Csi.common',
    'Csi.login',
    'Csi.home',
    'Csi.travelDetail',
    'Csi.vehicleDetail',
    'Csi.map'
  ])
  .value('AccessToken', {
    key: null
  })
  .config(Router)
  .config(MaterialTheme)
  // .config(GoogleMapsSDK)
  .run(Authentication);

}());
