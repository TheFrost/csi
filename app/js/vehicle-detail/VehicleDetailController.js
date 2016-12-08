(function() {
  'use strict';

  var VehicleDetailCtrl = function ($scope, $state, $stateParams, VehicleDetailService) {

    // if vin does'n exist in URL stop controller right here and go home
    if (!$stateParams.vehicleVin) {
      return $state.go('home');
    }

    var vehicleDetail = this;

    vehicleDetail.info = {};

    // Fetch
    $scope.$emit('loading');
    VehicleDetailService.getData($stateParams.vehicleVin)
      .then(
        function (data) {
          vehicleDetail.info = data.info;

          $scope.$emit('loaded');
        }
      );

  };
  VehicleDetailCtrl.$inject = ['$scope', '$state', '$stateParams', 'VehicleDetailService'];

  angular.module('Csi.vehicleDetail')
    .controller('VehicleDetailCtrl', VehicleDetailCtrl);

}());
