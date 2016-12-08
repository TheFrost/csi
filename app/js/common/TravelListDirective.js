(function() {
  'use strict';

  var TravelListDirective = function () {
    return {
      restrict: 'A',
      templateUrl: '../../../partials/travels/travels.tpl.html',
      replace: true,
      scope: {
        travels: '='
      },
      controller: ['$scope', '$state', function ($scope, $state) {

        $scope.goToDetail = function (id) {
          $state.go('travelDetail', { travelId: id });
        };

      }]
    };
  };

  angular.module('Csi.common')
    .directive('travelListDirective', TravelListDirective);

}());
