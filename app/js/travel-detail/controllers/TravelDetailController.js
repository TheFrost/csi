(function() {
  'use strict';

  var TravelDetailCtrl = function ($stateParams, $state, ApiService, API_ENDPOINTS) {

    // if id does'n exist in URL stop controller right here and go home
    if (!$stateParams.travelId) {
      return $state.go('home');
    }

    // if id exist continue cotroller
    var travelDetail = this;

    travelDetail.vehicles = [];

    var records = {
      'Trips': [
        {
          'IdViaje': $stateParams.travelId
        }
      ]
    };

    ApiService.send(API_ENDPOINTS.getTravelDetail, 'POST', records)
      .then(
        function (res) {

          travelDetail.vehicles = res.data.Records.Vehicles;
          console.log(travelDetail.vehicles);

        },
        function () {
          console.log('problem service');
        }
      );


    // Methods
    var goToDetail = function (vin) {
      $state.go('vehicleDetail', { vehicleVin: vin });
    };

    // Exposed methods
    travelDetail.goToDetail = goToDetail;

  };
  TravelDetailCtrl.$inject = ['$stateParams', '$state', 'ApiService', 'API_ENDPOINTS'];

  angular.module('Csi.travelDetail')
    .controller('TravelDetailCtrl', TravelDetailCtrl);

}());
