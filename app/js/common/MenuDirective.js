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
      link: function ($scope) {

        // selectors
        var menuOverlay = angular.element(document.querySelector('#menu-overlay'));

        // methods
        var toggleOverlay = function () {

          if (menuOverlay.hasClass('js-active')) {
            menuOverlay.css('opacity', 0);
            $timeout(function () {
              menuOverlay.css('display', 'none');
            }, 200);

            $scope.overlayActive = false;
          } else {
            menuOverlay.css('display', 'block');
            $timeout(function () {
              menuOverlay.css('opacity', 1);
            }, 50);

            $scope.overlayActive = true;
          }

        };

        var toggleMenu = function () {
          $scope.triggerActive = !$scope.triggerActive;
          $mdSidenav('mainMenu').toggle();

          toggleOverlay();
        };

        var logout = function () {
          AuthService.logout();
        };

        // scope methods
        $scope.toggleMenu = toggleMenu;
        $scope.logout = logout;
        $scope.triggerActive = false;
        $scope.overlayActive = false;


      }
    };
  };
  MenuDirective.$inject = ['$timeout', '$mdSidenav', 'AuthService'];

  angular.module('Csi.common')
    .directive('menuDirective', MenuDirective);

}());
