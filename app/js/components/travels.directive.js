(function() {
  'use strict';


  angular.module('Csi.common')
    .directive('csiTravels', csiTravels);

  
  function csiTravels() {
    return {
      restrict: 'A',
      templateUrl: 'partials/travels.tpl.html',
      replace: true,
      scope: {
        list: '='
      },
      controller: TravelsCtrl,
        controllerAs: 'travels',
        bindToController: true
    };
  }


  /**
  * @ngInject
  */
  function TravelsCtrl($scope, $state) {

    var travels = this;
    
    travels.goToDetail = goToDetail;
    travels.isDelivered = isDelivered;
    travels.isEvaluated = isEvaluated;
    travels.noTravels = false;

    //////////////////////////////////////////////////
    
    function goToDetail(id) {
      $state.go('travelDetail', { travelId: id });
    }

    function isDelivered(status) {
      return status === 'ENTREGADO';
    }

    function isEvaluated(score) {
      return score > 0;
    }

    ////////////////////////////////////////////////

    $scope.$watch('travels.list', function () {
      travels.noTravels = travels.list.length ? false : true;
    });
  }

}());
