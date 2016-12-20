(function() {
  'use strict';


  angular.module('Csi.vehicleDetail')
    .controller('VehicleDetailCtrl', VehicleDetailCtrl);


  /**
  * @ngInject
  */
  function VehicleDetailCtrl(vehicleDetailData) {

    var vehicleDetail = this;

    vehicleDetail.info = {};

    activate();

    ////////////////////////////////////////////

    function activate () {
      vehicleDetail.info = vehicleDetailData.info;
    }

  }

}());
