(function() {
  'use strict';


  angular.module('Csi.common')
    .factory('apiFactory', apiFactory);



  /**
  * @ngInject
  */
  function apiFactory($rootScope, $q, $http, API_URL, AccessToken, moment) {

    console.log(AccessToken);

    var factory = {
      send: send
    };

    return factory;

    ////////////////////////////////////////////////////////

    function send(endpoint, method, records) {
      var defered = $q.defer(),
          promise = defered.promise;

      var data = {
        method: method,
        url: API_URL + endpoint,
        data: {
          'Operation': {
            'DateTime': moment().format(),
            'Access_Token': AccessToken.key
          },
          'Records': records ? records : {}
        }
      };

      $http(data)
        .success(function(data) {

          if (data.Success && data.Success === 'false') {
            errorResponse(data);

            defered.reject(data);
          }

          defered.resolve(data);
          
        })
        .error(function(err) {
          defered.reject(err);
        });

      return promise;
    }


    function errorResponse (data) {
      if (data.Operation.ErrorMessage && data.Operation.ErrorMessage === 'Sesion Expirada') {

        $rootScope.$emit('unauthenticated');

      } else {

        $rootScope.$emit('error-response');

      }
    }

  }

}());
