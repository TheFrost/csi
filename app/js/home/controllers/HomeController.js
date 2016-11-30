(function() {
  'use strict';

  var HomeCtrl = function ($q, ApiService, API_ENDPOINTS) {

    var home = this;

    home.shortcuts = {};

    // Private Methods
    var _renderShortcuts = function (shortcuts) {
      console.log(shortcuts);

      angular.forEach(shortcuts, function (value) {
        home.shortcuts[Object.keys(value)[0]] = value[Object.keys(value)[0]] == 'true' ? true : false;
      });
    };

    var _renderSurvillanceTravels = function (travels) {
      console.log(travels);
    }

    // Simultaneus request control
    var _travelsRecords = {
      'TripType': 'CURRENT',
      'Page': 1,
      'EnVigilancia': 1
    };

    $q.all({
      preferences: ApiService.send(API_ENDPOINTS.getPreferences, 'POST'),
      travels: ApiService.send(API_ENDPOINTS.getTravelList, 'POST', _travelsRecords)
    }).then(function (res) {
      _renderShortcuts(res.preferences.data.Records.User.Shorcuts);
      _renderSurvillanceTravels(res.travels.data.Records.Trips);
    });

  };
  HomeCtrl.$inject = ['$q', 'ApiService', 'API_ENDPOINTS'];


  angular
    .module('Csi.home', [])
    .controller('HomeCtrl', HomeCtrl);


}());
