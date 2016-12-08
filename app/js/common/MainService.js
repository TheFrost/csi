(function() {
  'use strict';

  function MainService (API_ENDPOINTS, ApiService) {

    var getUser = function () {

      return ApiService.send(API_ENDPOINTS.getUser, 'POST')
        .then(
          function (res) {
            var user = res.data.Records.User;

            return {
              name : user.Name,
              email : user.Mail,
              avatar : user.Avatar
            };
          }
        );

    };

    return {
      getUser: getUser
    };

  }
  MainService.$inject = ['API_ENDPOINTS', 'ApiService'];


  angular.module('Csi.common')
    .factory('MainService', MainService);

}());
