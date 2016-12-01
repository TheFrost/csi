(function() {
  'use strict';

  var MainCtrl = function ($scope, $timeout, AUTH_EVENTS, API_ENDPOINTS, ApiService, AccessToken) {

    var main = this;

    main.user = {
      name : '',
      email : '',
      avatar : ''
    };

    // Privat methods
    var _getUser = function () {
      ApiService.send(API_ENDPOINTS.getUser, 'POST')
        .then(
          function (res) {
            var user = res.data.Records.User;

            main.user = {
              name : user.Name,
              email : user.Mail,
              avatar : user.Avatar
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

  };
  MainCtrl.$inject = ['$scope', '$timeout', 'AUTH_EVENTS', 'API_ENDPOINTS', 'ApiService', 'AccessToken'];

  angular.module('Csi.common')
    .controller('MainCtrl', MainCtrl);

}());
