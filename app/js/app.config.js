(function() {
  'use strict';


  angular.module('Csi')
    .config(materialTheme);

  
  /**
  * @ngInject
  */
  function materialTheme($mdThemingProvider) {

    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('blue');

  }

}());