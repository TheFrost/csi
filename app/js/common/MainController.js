(function() {
  'use strict';

  var MainCtrl = function ($scope, $timeout, AUTH_EVENTS, AccessToken, MainService) {

    var main = this;

    main.user = {
      avatar: 'img/profile-generic.jpg'
    };
    main.loading = false;

    // Privat methods
    var _getUser = function () {

      MainService.getUser()
        .then(
          function (data) {
            main.user = {
              name: data.name,
              email: data.email,
              avatar: data.avatar
            };
          }
        );

    };

    // Public methods
    main.init = function () {
      $timeout(function () {
        if (AccessToken.key) {
          _getUser();
        }
      }, 500);
    };

    // bind events
    $scope.$on(AUTH_EVENTS.loginSuccess, function () {
      _getUser();
    });

    $scope.$on('loading', function () {
      main.loading = true;
    });

    $scope.$on('loaded', function () {
      main.loading = false;
    });

  };
  MainCtrl.$inject = ['$scope', '$timeout', 'AUTH_EVENTS', 'AccessToken', 'MainService'];


  angular.module('Csi.common')
    .controller('MainCtrl', MainCtrl);

}());
