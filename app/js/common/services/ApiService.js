(function() {
  'use strict';

  var ApiService = function ($http, API_URL, AccessToken, moment) {

    console.log(AccessToken);

    var send = function (endpoint, method, records) {
      return $http({
        method: method,
        url: API_URL + endpoint,
        data: {
          'Operation': {
            'DateTime': moment().format(),
            'Access_Token': AccessToken.key
          },
          'Records': records ? records : {}
        }
      });
    };

    return {
      send: send
    };

  };
  ApiService.$inject = ['$http', 'API_URL', 'AccessToken', 'moment'];


  angular.module('Csi.common')
    .factory('ApiService', ApiService);

}());
