(function() {
  'use strict';

  var SessionService = function (store, AccessToken) {
    var session = this;

    session.create = function (sessionToken, sessionExpiration) {
      store.set('csi.session', {
        date: sessionExpiration,
        tkn: sessionToken
      });

      AccessToken.key = sessionToken;
    };

    session.destroy = function () {
      store.remove('csi.session');
    };

    session.get = function () {
      return store.get('csi.session');
    };
  };
  SessionService.$inject = ['store', 'AccessToken'];


  angular.module('Csi.login')
    .service('SessionService', SessionService);


}());
