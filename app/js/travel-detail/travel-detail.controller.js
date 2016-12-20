(function() {
  'use strict';


  angular.module('Csi.travelDetail')
    .controller('TravelDetailCtrl', TravelDetailCtrl);
    

  /**
  * @ngInject
  */
  function TravelDetailCtrl($state, travelDetailData) {

    var travelDetail = this;

    travelDetail.vehicles = [];
    travelDetail.goToDetail = goToDetail;

    activate();

    ///////////////////////////////

    // Public Methods
    function goToDetail(vin) {
      $state.go('vehicleDetail', { vehicleVin: vin });
    }

    function activate () {
      travelDetail.vehicles = travelDetailData.vehicles;
    }

  }

}());
