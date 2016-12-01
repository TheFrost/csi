(function() {
  'use strict';

  var travelList = {
    bindings: {
      travels: '='
    },
    templateUrl: '../../../partials/travels/travels.tpl.html',
    controller: function ($state) {

      function goToDetail (id) {
        console.log(id);
        $state.go('travelDetail', { travelId: id });

      }

      // espose method
      this.goToDetail = goToDetail;

    }
  };

  angular.module('Csi.common')
    .component('travelList', travelList);

}());
