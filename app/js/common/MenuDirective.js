(function() {
  'use strict';

  var MenuDirective = function ($timeout, $mdSidenav, AuthService) {
    return {
      restrict: 'A',
      templateUrl: '../../../partials/menu/menu.tpl.html',
      replace: true,
      scope: {
        user: '='
      },
      controller: ['$scope', function ($scope) {

        $scope.activeMenu = false;

        $scope.toggleMenu = function () {
          $mdSidenav('mainMenu').toggle();
        };

        $scope.logout = function () {
          $scope.$emit('loading');
          AuthService.logout()
            .then(
              function () {
                $timeout(function () {
                  $scope.$emit('loaded');
                }, 100);
              }
            );
        };

      }]
    };
  };
  MenuDirective.$inject = ['$timeout', '$mdSidenav', 'AuthService'];

  angular.module('Csi.common')
    .directive('menuDirective', MenuDirective);

}());
