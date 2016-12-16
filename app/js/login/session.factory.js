(function() {
  'use strict';


  angular.module('Csi.login')
    .factory('sessionFactory', sessionFactory);



  /**
  * @ngInject
  */
  function sessionFactory(store, AccessToken) {

    var factory = {
      create: create,
      destroy: destroy,
      get: get
    };

    return factory;

    /////////////////////////////////////////////
    
    function create(sessionToken, sessionExpiration) {
      store.set('csi.session', {
        date: sessionExpiration,
        tkn: sessionToken
      });

      AccessToken.key = sessionToken;
    }

    function destroy() {
      store.remove('csi.session');
    }

    function get() {
      return store.get('csi.session');
    }

  }

}());
