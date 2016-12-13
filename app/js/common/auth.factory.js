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

    function authenticateUser() {
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
        AccessToken.key = !AccessToken.key ? session.tkn : AccessToken.key;

        // fallback when login is true block access to login view
        if ($location.path() === '/iniciar-sesion') {
          $state.go('home');
        }

      } else {
        $state.go('login');
      }
    }

  }

}());
