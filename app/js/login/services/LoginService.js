(function() {
  'use strict';

  var LoginService = function (ApiService, SessionService, API_ENDPOINTS) {

    var login = function (credentials) {

      var records = {
        'Login': {
          'username':credentials.username,
          'password':credentials.password,
          'ip': '127.0.0.1',
          'imei':'123123123123',
          'guest':'iOS9'
        }
      };

      return ApiService.send(API_ENDPOINTS.login, 'POST', records)
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
    };


    return {
      login: login
    };

  };
  LoginService.$inject = ['ApiService', 'SessionService', 'API_ENDPOINTS'];


  angular
    .module('Csi.login')
    .factory('LoginService', LoginService);

}());
