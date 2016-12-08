(function() {
  'use strict';

  function TravelDetailService (ApiService, API_ENDPOINTS) {

    function getData (id) {

      var records = {
        'Trips': [
          {
            'IdViaje': id
          }
        ]
      };

      return ApiService.send(API_ENDPOINTS.getTravelDetail, 'POST', records)
        .then(
          function (res) {
            return {
              vehicles: res.data.Records.Vehicles,
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
  TravelDetailService.$inject = ['ApiService', 'API_ENDPOINTS'];


  angular.module('Csi.travelDetail')
    .factory('TravelDetailService', TravelDetailService);

}());
