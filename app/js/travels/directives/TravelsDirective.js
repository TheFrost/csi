(function() {
  'use strict';

  var TravelsDirective = function () {
    return {
      restrict: 'A',
      templateUrl: '../../../partials/travels/travels.tpl.html',
      replace: true,
      scope: {
        travels: '='
      }
    }
  }

  angular.module('Csi.common')
    .directive('travelsDirective', TravelsDirective);

}());
