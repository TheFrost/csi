(function() {
  'use strict';


  angular.module('Csi.travelDetail')
    .factory('travelDetailFactory', travelDetailFactory);


  /**
  * @ngInject
  */
  function travelDetailFactory (apiFactory, API_ENDPOINTS) {

    var factory = {
      getData: getData
    };

    return factory;

    ////////////////////////////////////////////////////////////////

    function getData (id) {

      var records = {
        'Trips': [
          {
            'IdViaje': id
          }
        ]
      };

      return apiFactory.send(API_ENDPOINTS.getTravelDetail, 'POST', records)
        .then(
          function (res) {
            return {
              vehicles: res.data.Records.Vehicles,
            };
          },
          function () {
            console.log('problem service');
          }
        );

    }
  }

}());
