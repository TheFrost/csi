(function() {
  'use strict';


  angular.module('Csi.login')
    .factory('loginFactory', loginFactory);



  /**
  * @ngInject
  */
  function loginFactory($q, apiFactory, sessionFactory, API_ENDPOINTS) {

    var factory = {
      login: login
    };

    return factory;

    ////////////////////////////////////////////////////////////////

    function login(credentials) {

      var defered = $q.defer(),
          promise = defered.promise;

      var records = {
        'Login': {
          'username':credentials.username,
          'password':credentials.password,
          'ip': '127.0.0.1',
          'imei':'123123123123',
          'guest':'iOS9'
        }
      };

      apiFactory.send(API_ENDPOINTS.login, 'POST', records)
        .then(
          function (res) {
            var data = {
              date: res.Records.Token.Expiration,
              token: res.Records.Token.Access_Token
            };

            defered.resolve(data);
          }
        )
        .catch(
          function(err) {

            var responseError = {
              message: err ? err.Operation.ErrorMessage : 'Posible problema de conexión, favor de intentar más tarde.'
            };

            defered.reject(responseError);
          }
        );


      return promise;
    }

  }

}());
