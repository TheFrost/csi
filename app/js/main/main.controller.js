(function() {
  'use strict';


  angular.module('Csi.main')
    .controller('MainCtrl', MainCtrl);


  /**
  * @ngInject
  */
  function MainCtrl($scope, $timeout, AUTH_EVENTS, AccessToken, mainFactory) {

    var main = this;

    main.loading = false;
    main.init = init;
    main.user = {
      avatar: 'img/profile-generic.jpg'
    };

    //////////////////////////

    // Privat methods
    function _getUser () {
      mainFactory.getUser()
        .then(
          function (data) {
            main.user = {
              name: data.name,
              email: data.email,
              avatar: data.avatar
            };
          }
        );
    }

    // Public methods
    function init () {
      $timeout(function () {
        if (AccessToken.key) {
          _getUser();
        }
      }, 500);
    }

    // bind events
    $scope.$on(AUTH_EVENTS.loginSuccess, function () {
      _getUser();
    });

    $scope.$on('loading', function () {
      $timeout(function () {
        main.loading = true;
      }, 500);
    });

    $scope.$on('loaded', function () {
      main.loading = false;
    });

  }

}());
