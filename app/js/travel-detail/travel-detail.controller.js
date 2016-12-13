(function() {
  'use strict';


  angular.module('Csi.travelDetail')
    .controller('TravelDetailCtrl', TravelDetailCtrl);
    

  /**
  * @ngInject
  */
  function TravelDetailCtrl($scope, $stateParams, $state, travelDetailFactory) {

    // if id does'n exist in URL stop controller right here and go home
    if (!$stateParams.travelId) {
      return $state.go('home');
    }

    // if id exist continue cotroller
    var travelDetail = this;

    travelDetail.vehicles = [];
    travelDetail.goToDetail = goToDetail;

    ///////////////////////////////

    // Public Methods
    function goToDetail(vin) {
      $state.go('vehicleDetail', { vehicleVin: vin });
    }

    // Fetch
    $scope.$emit('loading');
    travelDetailFactory.getData($stateParams.travelId)
      .then(
        function (data) {
          travelDetail.vehicles = data.vehicles;

          $scope.$emit('loaded');
        }
      );

  }

}());
