(function() {
  'use strict';


  /*Splash time life*/
  setTimeout(function asyncBootstrap() {
    angular.bootstrap( document, [ 'Csi' ] );
  },( 2 * 1000 ));


  angular.module('Csi', [
    'Csi.common',
    'Csi.login',
    'Csi.home',
    'Csi.travelDetail',
    'Csi.vehicleDetail',
    'Csi.map',
    'Csi.main',
    'Csi.templates'
  ]);

}());
