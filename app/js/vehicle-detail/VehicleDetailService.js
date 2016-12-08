(function() {
  'use strict';

  function VehicleDetailService (ApiService, API_ENDPOINTS) {

    function getData (vin) {

      var records = {
        'Vehicles': [
          {
            'VIN': vin
          }
        ]
      };

      return ApiService.send(API_ENDPOINTS.getVehicleDetail, 'POST', records)
        .then(
          function (res) {
            return {
              info: res.data.Records.Vehicles[0]
            };
          },
          function () {
            console.log('problem service');
          }
        );

    }

    return {
      getData: getData
    };

  }
  VehicleDetailService.$inject = ['ApiService', 'API_ENDPOINTS'];


  angular.module('Csi.vehicleDetail')
    .factory('VehicleDetailService', VehicleDetailService);

}());
