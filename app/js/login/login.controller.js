(function() {
  'use strict';


  angular.module('Csi.login')
    .controller('LoginCtrl', LoginCtrl);


  /**
  * @ngInject
  */
  function LoginCtrl($scope, $timeout, $state, AUTH_EVENTS, loginFactory, sessionFactory) {

    var login = this;

    login.submitted = false;
    login.waiting = false;
    login.error = false;
    login.success = false;
    login.feedback = false;
    login.problem = false;
    login.disable = false;
    login.errorMessage = '';
    login.submit = submit;
    login.credentials = {
      username: '',
      password: ''
    };

    /////////////////////////////////

    /*Private Scope*/
    function _resetState() {
      login.submitted = false;
      login.waiting = false;
      login.error = false;
      login.success = false;
      login.feedback = false;
      login.disable = false;
    }

    function _loginSuccess(token, date) {
      login.waiting = false;
      login.success = true;

      sessionFactory.create(token, date);

      $scope.$emit(AUTH_EVENTS.loginSuccess);

      $timeout(function () {
        _resetState();
        $state.go('home');
      }, 1000);
    }

    function _loginFail(message) {
      login.waiting = false;
      login.error = true;
      login.errorMessage = message;

      $timeout(function () {
        _resetState();
      }, 3000);
    }

    function _problemService() {
      _loginFail();

      login.problem = true;
      login.errorMessage = 'Problema de conexión, intente de nuevo por favor';

      $timeout(function () {
        _resetState();
      }, 3000);
    }

    function _waitingFeedback() {
      console.log('Waiting feedback');
      login.feedback = true;
      login.waiting = true;
      login.disable = true;
    }

    /*Public Scope*/
    function submit(credentials) {
      _waitingFeedback();

      // simulate loading feedback
      $timeout(function () {
        loginFactory.login(credentials)
          .then(
            function (res) {
              _loginSuccess(res.token, res.date);
              // login.setCurrentUser(user);
            }
          )
          .catch(
            function(err) {
              _loginFail(err.message);
            }
          );
      }, 2000);
    }

  }

}());
