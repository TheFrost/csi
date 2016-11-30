(function() {
  'use strict';

  var AUTH_EVENTS = {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated'
  };

  angular
    .module('Csi.login', [])
    .constant('AUTH_EVENTS', AUTH_EVENTS);

}());
