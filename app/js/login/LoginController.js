(function() {
  'use strict';


  var LoginCtrl = function ($scope, $timeout, $location, AUTH_EVENTS, LoginService, SessionService) {

    var login = this;

    /*Private Scope*/
    var _resetState = function () {
      login.submitted = false;
      login.waiting = false;
      login.error = false;
      login.success = false;
      login.feedback = false;
    };

    var _loginSuccess = function (token, date) {
      login.waiting = false;
      login.success = true;

      SessionService.create(token, date);
      
      $scope.$emit(AUTH_EVENTS.loginSuccess);

      $timeout(function () {
        _resetState();
        $location.url('/home');
      }, 1000);
    };

    var _loginFail = function (message) {
      login.waiting = false;
      login.error = true;
      login.errorMessage = message;

      $timeout(function () {
        _resetState();
      }, 3000);
    };

    var _problemService = function () {
      _loginFail();

      login.problem = true;
      login.errorMessage = 'Problema de conexión, intente de nuevo por favor';

      $timeout(function () {
        _resetState();
      }, 3000);
    };

    var _waitingFeedback = function () {
      console.log('Waiting feedback');
      login.feedback = true;
      login.waiting = true;
    };

    /*Public Scope*/
    login.credentials = {
      username: '',
      password: ''
    };

    login.submit = function (credentials) {
      _waitingFeedback();

      // simulate loading feedback
      $timeout(function () {
        LoginService.login(credentials)
          .then(
            function (res) {
              if (res.access) {
                _loginSuccess(res.token, res.date);
              } else {
                _loginFail(res.message);
              }
              // login.setCurrentUser(user);
            },
            function () {
              _problemService();
            }
          );
      }, 2000);
    };

  };
  LoginCtrl.$inject = ['$scope', '$timeout', '$location', 'AUTH_EVENTS', 'LoginService', 'SessionService'];


  angular
    .module('Csi.login')
    .controller('LoginCtrl', LoginCtrl);


}());
