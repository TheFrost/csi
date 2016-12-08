(function() {
  'use strict';

  var AuthService = function ($rootScope, $state, $location, AccessToken, moment, SessionService, ApiService, API_ENDPOINTS) {

    var logout = function () {
      return ApiService.send(API_ENDPOINTS.logout, 'POST')
        .then(function () {
          SessionService.destroy();
          AccessToken.key = null;
          $state.go('login');
        },
        function () {
          console.log('problem service');
        });
    };

    var authenticateUser = function () {
      var session = SessionService.get(),
          date = '',
          today = '';

      if (session) {
        console.log(session);

        date = moment(session.date);
        today = moment();

        // if expiration true stop method right here
        if (today >= date) {
          return logout();
        }

        // if expiration false continue method
        AccessToken.key = !AccessToken.key ? session.tkn : AccessToken.key;

        // fallback when login is true block access to login view
        if ($location.path() === '/login') {
          $state.go('home');
        }

      } else {
        $state.go('login');
      }
    };

    return {
      authenticateUser: authenticateUser,
      logout: logout
    };

  };
  AuthService.$inject = ['$rootScope', '$state', '$location', 'AccessToken', 'moment', 'SessionService', 'ApiService', 'API_ENDPOINTS'];

  angular.module('Csi.common')
    .factory('AuthService', AuthService);

}());
