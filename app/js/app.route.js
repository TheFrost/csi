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
        url: '/listado-de-viajes/:pending',
        templateUrl: 'partials/hardcode/travellist.html',
        controller: 'TravelListCtrl as travelList',
        resolve: {
          travelListData: travelListResolve
        }
      })
      .state('travelDetail', {
        url: '/detalle-de-viaje/:travelId',
        templateUrl: 'partials/hardcode/traveldetail.html',
        controller: 'TravelDetailCtrl as travelDetail',
        resolve: {
          travelDetailData: travelDetailResolve
        }
      })
      .state('vehicleDetail', {
        url: '/detalle-de-vehiculo/:vehicleVin',
        templateUrl: 'partials/hardcode/cardetail.html',
        controller: 'VehicleDetailCtrl as vehicleDetail',
        resolve: {
          vehicleDetailData: vehicleDetailResolve
        }
      })
      .state('config', {
        url: '/configuracion',
        templateUrl: 'partials/hardcode/configuration.html',
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