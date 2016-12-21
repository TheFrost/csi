(function() {
  'use strict';



  angular.module('Csi.common')
    .directive('csiMenu', csiMenu);



  function csiMenu() {
    return {
      restrict: 'A',
      templateUrl: 'partials/menu.tpl.html',
      replace: true,
      scope: {
        user: '='
      },
      controller: MenuCtrl,
        controllerAs: 'menu',
        bindToController: true
    };
  }


  /**
  * @ngInject
  */
  function MenuCtrl($scope, $timeout, $mdSidenav, authFactory) {

    var menu = this;

    menu.activeMenu = false;
    menu.toggleMenu = toggleMenu;
    menu.logout = logout;

    /////////////////////////////////////////////

    function toggleMenu() {
      $mdSidenav('mainMenu').toggle();
    }

    function logout() {
      $scope.$emit('loading');
      authFactory.logout()
        .then(
          function () {
            $timeout(function () {
              $scope.$emit('loaded');
            }, 100);
          }
        );
    }

  }

}());
