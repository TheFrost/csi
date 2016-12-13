(function() {
  'use strict';


  angular.module('Csi.vehicleDetail')
    .controller('VehicleDetailCtrl', VehicleDetailCtrl);


  /**
  * @ngInject
  */
  function VehicleDetailCtrl($scope, $state, $stateParams, vehicleDetailFactory) {

    // if vin does'n exist in URL stop controller right here and go home
    if (!$stateParams.vehicleVin) {
      return $state.go('home');
    }

    var vehicleDetail = this;

    vehicleDetail.info = {};

    ////////////////////////////////////////////

    // Fetch
    $scope.$emit('loading');
    vehicleDetailFactory.getData($stateParams.vehicleVin)
      .then(
        function (data) {
          vehicleDetail.info = data.info;

          $scope.$emit('loaded');
        }
      );

  }

}());
