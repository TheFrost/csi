  (function(){
  'use strict';

  angular
    .module('Csi.common')
    .factory('authInterceptorFactory', authInterceptorFactory);

  /** @ngInject */
  function authInterceptorFactory($q, $rootScope){

    return {
      response: response
    };

    /////////////////////////////////////

    function response(res){

      if (res.data.Success) {

        var success = res.data.Success == 'true' ? true : false,
            errorMessage = res.data.Operation.ErrorMessage;

        if (!success) {

          if (errorMessage === 'Sesion Expirada') {

            $rootScope.$emit('unauthenticated');

            return $q.reject(res);

          } else {

            $rootScope.$emit('error-response');

          }

        }

      }

      return res;
    }
  }

  }());