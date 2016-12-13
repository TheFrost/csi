(function() {
  'use strict';


  angular.module('Csi.common')
    .factory('apiFactory', apiFactory);



  /**
  * @ngInject
  */
  function apiFactory($http, API_URL, AccessToken, moment) {

    console.log(AccessToken);

    var factory = {
      send: send
    };

    return factory;

    ////////////////////////////////////////////////////////

    function send(endpoint, method, records) {
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
    }

  }

}());
