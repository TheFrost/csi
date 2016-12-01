(function() {
  'use strict';

  var VehicleDetailCtrl = function ($state, $stateParams, ApiService, API_ENDPOINTS) {

    // if vin does'n exist in URL stop controller right here and go home
    if (!$stateParams.vehicleVin) {
      return $state.go('home');
    }

    var vehicleDetail = this;

    vehicleDetail.info = {};

    // Fetch
    var records = {
      'Vehicles': [
        {
          'VIN': $stateParams.vehicleVin
        }
      ]
    };
    ApiService.send(API_ENDPOINTS.getVehicleDetail, 'POST', records)
      .then(
        function (res) {
          vehicleDetail.info = res.data.Records.Vehicles[0];
        },
        function () {
          console.log('problem service');
        }
      );

  };
  VehicleDetailCtrl.$inject = ['$state', '$stateParams', 'ApiService', 'API_ENDPOINTS'];

  angular.module('Csi.vehicleDetail')
    .controller('VehicleDetailCtrl', VehicleDetailCtrl);

}());
