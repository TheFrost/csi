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
        controller: 'LoginCtrl as login'
      })
      .state('home', {
        url: '/',
        templateUrl: 'partials/home/home.tpl.html',
        controller: 'HomeCtrl as home',
        resolve: {
          homeData: homeResolve
        }
      })
      .state('map', {
        url: '/mapa-de-tracking',
        templateUrl: 'partials/map/map.tpl.html',
        controller: 'MapCtrl as map'
      })
      .state('travelList', {
        url: '/listado-de-viajes',
        templateUrl: 'partials/hardcode/travellist.html'
      })
      .state('travelDetail', {
        url: '/detalle-de-viaje/:travelId',
        templateUrl: 'partials/hardcode/traveldetail.html',
        controller: 'TravelDetailCtrl as travelDetail'
      })
      .state('vehicleDetail', {
        url: '/detalle-de-vehiculo/:vehicleVin',
        templateUrl: 'partials/hardcode/cardetail.html',
        controller: 'VehicleDetailCtrl as vehicleDetail'
      })
      .state('config', {
        url: '/configuracion',
        templateUrl: 'partials/hardcode/configuration.html'
      });

    $urlRouterProvider.otherwise('/');

  }

  ////////////////////////////////////////////////////////////// 

  /**
  * @ngInject
  */
  function homeResolve(homeFactory) {
    return homeFactory.getData();
  }

}());