(function() {
  'use strict';


  angular.module('Csi.vehicleDetail')
    .controller('VehicleDetailCtrl', VehicleDetailCtrl);


  /**
  * @ngInject
  */
  function VehicleDetailCtrl($scope, $state, $stateParams, vehicleDetailData) {

    // if vin does'n exist in URL stop controller right here and go home
    if (!$stateParams.vehicleVin) {
      return $state.go('home');
    }

    var vehicleDetail = this;

    vehicleDetail.info = {};

    activate();

    ////////////////////////////////////////////

    function activate () {
      vehicleDetail.info = vehicleDetailData.info;
    }

  }

}());
