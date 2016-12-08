(function() {
  'use strict';

  function HomeService ($q, ApiService, API_ENDPOINTS) {

    var _travelsRecords = {
      'TripType': 'CURRENT',
      'Page': 1,
      'EnVigilancia': 0
    };

    var getData = function () {

      return $q.all({
        preferences: ApiService.send(API_ENDPOINTS.getPreferences, 'POST'),
        travels: ApiService.send(API_ENDPOINTS.getTravelList, 'POST', _travelsRecords),
        slides: ApiService.send(API_ENDPOINTS.getSlides, 'POST')
      }).then(function (res) {
        return {
          shortcuts: res.preferences.data.Records.User.Shortcuts,
          survillance: res.travels.data.Records.Trips,
          slides: res.slides.data.Records.Images
        };
      });

    };

    return {
      getData: getData
    };

  }
  HomeService.$inject = ['$q', 'ApiService', 'API_ENDPOINTS'];


  angular.module('Csi.home')
    .factory('HomeService', HomeService);

}());
