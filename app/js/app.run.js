(function() {
  'use strict';


  angular.module('Csi')
    .run(Authentication);

  
  /**
  * @ngInject
  */
  function Authentication($rootScope, authFactory) {

    $rootScope.$on('$stateChangeSuccess', function(evt) {
      evt.preventDefault();
      authFactory.authenticateUser();
    });

  }


}());