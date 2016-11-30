(function() {
  'use strict';

  angular.module('Csi.common', [])
    .constant('API_URL', 'https://sonic.csigroup.com.mx:7503/csiapp')
    .constant('API_ENDPOINTS', {
      login: '/Login',
      logout: '/Signout',
      getUser: '/UserProfile',
      getPreferences: '/Preferences',
      getTravelList: '/TravelList'
    });

}());
