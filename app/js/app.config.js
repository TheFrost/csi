(function() {
  'use strict';


  angular.module('Csi')
    .config(materialTheme)
    .config(httpInterceptors);

  
  /**
  * @ngInject
  */
  function materialTheme($mdThemingProvider) {

    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('blue');

  }


  /**
  * @ngInject
  */
  function httpInterceptors ($httpProvider) {
    
    $httpProvider.interceptors.push('authInterceptorFactory');

  }


}());