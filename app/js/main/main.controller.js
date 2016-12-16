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
    main.user = {
      avatar: 'img/profile-generic.jpg'
    };

    activate();

    ////////////////////////////////////////////////

    // bind events
    $scope.$on(AUTH_EVENTS.loginSuccess, function () {
      _getUser();
    });

    //////////////////////////////////////////////

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

    /*function activate () {
      $timeout(function () {
        if (AccessToken.key) {
          _getUser();
        }
      }, 500);
    }*/

    function activate () {
      $timeout(function () {
        _getUser();
      }, 500);
    }

  }

}());
