(function() {
  'use strict';


  angular.module('Csi')
    .run(routerBindEvents);

  
  /**
  * @ngInject
  */
  function routerBindEvents($rootScope, $timeout, $state, authFactory) {

    var time = null;

    $rootScope.loadingView = false;
    $rootScope.loadingError = false;
    $rootScope.viewLock = false;

    //////////////////////////////////////////////////

    // bind events
    $rootScope.$on('$stateChangeStart', function(evt, toState, toParams, fromState) {
      // validate session
      authFactory.authenticateUser(toState.name, fromState.name);

      // Redirect or stop locked views
      if ($rootScope.viewLock) {
        evt.preventDefault();

        if (!fromState.name && toState.name === 'login') {
          $state.go('home');
        }

        return true;
      }

      // detect resolve object in route
      if (toState && toState.resolve) {
        loading();
      }
    });

    $rootScope.$on('$stateChangeSuccess', function() {
      loaded();
    });

    $rootScope.$on('loading', function() {
      loading();
    });

    $rootScope.$on('loaded', function() {
      loaded();
    });

    $rootScope.$on('view-lock', function() {
      $rootScope.viewLock = true;
    });

    $rootScope.$on('view-unlock', function() {
      $rootScope.viewLock = false;
    });

    $rootScope.$on('unauthenticated', function() {
      $state.transitionTo('login');
      loaded();
    });

    $rootScope.$on('error-response', function() {
      $state.transitionTo('home');
      loaded();
    });

    //////////////////////////////////////////////////

    function loading() {

      $rootScope.loadingView = true;

      time = $timeout(function() {
        $rootScope.loadingError = true;
      }, 20000);

    }

    function loaded() {
      $timeout(function() {
        $rootScope.loadingView = false;
        $rootScope.loadingError = false;
        $timeout.cancel(time);
      }, 1000);

    }

  }


}());