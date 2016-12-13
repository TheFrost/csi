(function() {
  'use strict';


  angular.module('Csi.home')
    .factory('homeFactory', homeFactory);


  /**
  * @ngInject
  */
  function homeFactory ($q, apiFactory, API_ENDPOINTS) {

    var factory = {
      getData: getData
    };

    return factory;

    ///////////////////////////////////////////////////////////////

    function getData() {

      var _travelsRecords = {
        'TripType': '',
        'Page': 1,
        'EnVigilancia': 1
      };

      return $q.all({
        preferences: apiFactory.send(API_ENDPOINTS.getPreferences, 'POST'),
        travels: apiFactory.send(API_ENDPOINTS.getTravelList, 'POST', _travelsRecords),
        slides: apiFactory.send(API_ENDPOINTS.getSlides, 'POST')
      }).then(function (res) {
        return {
          shortcuts: res.preferences.data.Records.User.Shortcuts,
          survillance: res.travels.data.Records.Trips,
          slides: res.slides.data.Records.Images
        };
      });

    }

  }

}());
