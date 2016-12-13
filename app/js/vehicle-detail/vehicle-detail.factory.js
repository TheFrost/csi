(function() {
  'use strict';


  angular.module('Csi.vehicleDetail')
    .factory('vehicleDetailFactory', vehicleDetailFactory);



  /**
  * @ngInject
  */
  function vehicleDetailFactory (apiFactory, API_ENDPOINTS) {

    var factory = {
      getData: getData
    };

    return factory;

    ///////////////////////////////////////////////////////

    function getData (vin) {

      var records = {
        'Vehicles': [
          {
            'VIN': vin
          }
        ]
      };

      return apiFactory.send(API_ENDPOINTS.getVehicleDetail, 'POST', records)
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

  }

}());
