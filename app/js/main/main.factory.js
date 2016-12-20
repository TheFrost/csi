(function() {
  'use strict';


  angular.module('Csi.main')
    .factory('mainFactory', mainFactory);

    

  /**
  * @ngInject
  */
  function mainFactory (API_ENDPOINTS, apiFactory) {

    var factory = {
      getUser: getUser
    };

    return factory;

    ///////////////////////////////////////////////////////////

    function getUser() {

      return apiFactory.send(API_ENDPOINTS.getUser, 'POST')
        .then(
          function (res) {
            var user = res.Records.User;

            return {
              name : user.Name,
              email : user.Mail,
              avatar : user.Avatar
            };
          }
        );

    }

  }

}());
