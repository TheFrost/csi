(function() {
  'use strict';

  var TravelsCtrl = function ($state) {

    var travel = this;

    travel.goDetail = function () {
      $state.go('travelDetail');
    };

    travel.goCarDetail = function () {
      $state.go('carDetail');
    };

  };
  TravelsCtrl.$inject = ['$state'];

  angular.module('Csi')
    .controller('TravelsCtrl', TravelsCtrl);

}());
