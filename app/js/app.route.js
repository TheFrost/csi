(function() {
  'use strict';


  angular.module('Csi')
    .config(Router);

  
  /**
  * @ngInject
  */
  function Router($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('login', {
        url: '/iniciar-sesion',
        templateUrl: 'partials/login/login.tpl.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .state('home', {
        url: '/',
        templateUrl: 'partials/home/home.tpl.html',
        controller: 'HomeCtrl',
        controllerAs: 'home'
      })
      .state('map', {
        url: '/mapa-de-tracking',
        templateUrl: 'partials/map/map.tpl.html',
        controller: 'MapCtrl',
        controllerAs: 'map'
      })
      .state('travelList', {
        url: '/listado-de-viajes',
        templateUrl: 'partials/hardcode/travellist.html'
      })
      .state('travelDetail', {
        url: '/detalle-de-viaje/:travelId',
        templateUrl: 'partials/hardcode/traveldetail.html',
        controller: 'TravelDetailCtrl',
        controllerAs: 'travelDetail'
      })
      .state('vehicleDetail', {
        url: '/detalle-de-vehiculo/:vehicleVin',
        templateUrl: 'partials/hardcode/cardetail.html',
        controller: 'VehicleDetailCtrl',
        controllerAs: 'vehicleDetail'
      })
      .state('config', {
        url: '/configuracion',
        templateUrl: 'partials/hardcode/configuration.html'
      });

    $urlRouterProvider.otherwise('/');

  }

}());