(function() {
  'use strict';


  angular.module('Csi.login')
    .factory('loginFactory', loginFactory);



  /**
  * @ngInject
  */
  function loginFactory(apiFactory, sessionFactory, API_ENDPOINTS) {

    var factory = {
      login: login
    };

    return factory;

    ////////////////////////////////////////////////////////////////

    function login(credentials) {

      var records = {
        'Login': {
          'username':credentials.username,
          'password':credentials.password,
          'ip': '127.0.0.1',
          'imei':'123123123123',
          'guest':'iOS9'
        }
      };

      return apiFactory.send(API_ENDPOINTS.login, 'POST', records)
        .then(
          function (res) {
            return {
              access: res.data.Success == 'true' ? true : false,
              message: res.data.Operation.ErrorMessage,
              date: res.data.Records.Token.Expiration,
              token: res.data.Records.Token.Access_Token
            };
          }
        );
    }

  }

}());
