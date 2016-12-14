(function() {
  'use strict';


  angular.module('Csi')
    .run(routerBindEvents);

  
  /**
  * @ngInject
  */
  function routerBindEvents($rootScope, $timeout, authFactory) {

    var time = null;

    $rootScope.loadingView = false;
    $rootScope.loadingError = false;

    //////////////////////////////////////////////////

    // bind events
    $rootScope.$on('$stateChangeStart', function(evt, curr) {

      // validate session
      authFactory.authenticateUser();
      
      // detect resolve object in route
      if (curr && curr.resolve) {
        loading();
      }
    });

    $rootScope.$on('$stateChangeSuccess', function() {
      loaded();
    });

    //////////////////////////////////////////////////

    function loading() {

      $rootScope.loadingView = true;

      time = $timeout(function() {
        $rootScope.loadingError = true;
      }, 10000);

    }

    function loaded() {

      $timeout(function() {
        $rootScope.loadingView = false;
        $rootScope.loadingError = false;

        console.log(time);

        $timeout.cancel(time);
      }, 1000);

    }

  }


}());