(function() {
  'use strict';


  angular.module('Csi.common')
    .factory('authFactory', authFactory);



  /**
  * @ngInject
  */
  function authFactory($rootScope, $state, $location, AccessToken, moment, sessionFactory, apiFactory, API_ENDPOINTS) {

    var factory = {
      authenticateUser: authenticateUser,
      logout: logout
    };

    return factory;

    ///////////////////////////////////////////////////////////////////////////////////

    function logout() {
      $rootScope.$emit('loading');
      return apiFactory.send(API_ENDPOINTS.logout, 'POST')
        .then(function () {
          sessionFactory.destroy();
          AccessToken.key = null;
          $state.go('login');
        },
        function () {
          console.log('problem service');
        });
    }

    function authenticateUser(toState, fromState) {
      var session = sessionFactory.get(),
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
        AccessToken.key = AccessToken.key ? AccessToken.key : session.tkn;

        // fallback when login is true block access to login view
        if (toState === 'login') {
          $rootScope.$emit('view-lock');
        } else {
          $rootScope.$emit('view-unlock');
        }

      } else if (fromState) {
        $rootScope.$emit('view-lock');
      }
    }

  }

}());
