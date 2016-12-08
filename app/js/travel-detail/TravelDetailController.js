(function() {
  'use strict';

  var TravelDetailCtrl = function ($scope, $stateParams, $state, TravelDetailService) {

    // if id does'n exist in URL stop controller right here and go home
    if (!$stateParams.travelId) {
      return $state.go('home');
    }

    // if id exist continue cotroller
    var travelDetail = this;

    travelDetail.vehicles = [];

    // Public Methods
    travelDetail.goToDetail = function (vin) {
      $state.go('vehicleDetail', { vehicleVin: vin });
    };

    // Fetch
    $scope.$emit('loading');
    TravelDetailService.getData($stateParams.travelId)
      .then(
        function (data) {
          travelDetail.vehicles = data.vehicles;

          $scope.$emit('loaded');
        }
      );

  };
  TravelDetailCtrl.$inject = ['$scope', '$stateParams', '$state', 'TravelDetailService'];

  angular.module('Csi.travelDetail')
    .controller('TravelDetailCtrl', TravelDetailCtrl);

}());
