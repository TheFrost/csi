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
        templateUrl: 'partials/login.tpl.html',
        controller: 'LoginCtrl as login'
      })
      .state('home', {
        url: '/',
        templateUrl: 'partials/home.tpl.html',
        controller: 'HomeCtrl as home',
        resolve: {
          homeData: homeResolve
        }
      })
      .state('map', {
        url: '/mapa-de-tracking',
        templateUrl: 'partials/map.tpl.html',
        controller: 'MapCtrl as map'
      })
      .state('travelList', {
        url: '/listado-de-viajes/:pending',
        templateUrl: 'partials/travel-list.tpl.html',
        controller: 'TravelListCtrl as travelList',
        resolve: {
          travelListData: travelListResolve
        }
      })
      .state('travelDetail', {
        url: '/detalle-de-viaje/:travelId',
        templateUrl: 'partials/travel-detail.tpl.html',
        controller: 'TravelDetailCtrl as travelDetail',
        resolve: {
          travelDetailData: travelDetailResolve
        }
      })
      .state('vehicleDetail', {
        url: '/detalle-de-vehiculo/:vehicleVin',
        templateUrl: 'partials/car-detail.tpl.html',
        controller: 'VehicleDetailCtrl as vehicleDetail',
        resolve: {
          vehicleDetailData: vehicleDetailResolve
        }
      })
      .state('config', {
        url: '/configuracion',
        templateUrl: 'partials/configuration.tpl.html',
        resolve: {
          userData: userResolve
        }
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

  /**
  * @ngInject
  */
  function travelListResolve(travelListFactory) {
    return travelListFactory.getAll();
  }

  /**
  * @ngInject
  */
  function userResolve(mainFactory) {
    return mainFactory.getUser();
  }

  /**
  * @ngInject
  */
  function travelDetailResolve($stateParams, travelDetailFactory) {
    return travelDetailFactory.getData($stateParams.travelId);
  }

  /**
  * @ngInject
  */
  function vehicleDetailResolve($stateParams, vehicleDetailFactory) {
    return vehicleDetailFactory.getData($stateParams.vehicleVin);
  }

}());