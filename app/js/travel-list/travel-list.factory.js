(function(){
    'use strict';

    angular.module('Csi.travelList')
      .factory('travelListFactory', travelListFactory);

    /**
    * @ngInject
    */
    function travelListFactory($q, apiFactory, API_ENDPOINTS){

      var tripTabs = {
        tab1: 'CURRENT',
        tab2: 'ARRIVED',
        tab3: 'DELIVERED'
      };

      var factory = {
          getAll: getAll,
          getTab: getTab
      };

      return factory;

      /////////////////////////////////////////////////

      function _getRecords(tab, page) {
        return {
          'TripType': tripTabs[tab],
          'Page': page,
          'EnVigilancia': 0
        };

      }

      function getAll(){
        
        return $q.all({
          tab1: apiFactory.send(API_ENDPOINTS.getTravelList, 'POST', _getRecords('tab1', 1)),
          tab2: apiFactory.send(API_ENDPOINTS.getTravelList, 'POST', _getRecords('tab2', 1)),
          tab3: apiFactory.send(API_ENDPOINTS.getTravelList, 'POST', _getRecords('tab3', 1))
        }).then(function(res) {

          return  {
            tab1: res.tab1.data.Records.Trips,
            tab2: res.tab2.data.Records.Trips,
            tab3: res.tab3.data.Records.Trips
          };

        });

      }

      function getTab(tab, page){
        
        return apiFactory.send(API_ENDPOINTS.getTravelList, 'POST', _getRecords(tab, page))
          .then(
            function(res) {
              
              console.log(res);

            },
            function() {
              
              console.log('Problem service');

            }
          );

      }

    }

}());