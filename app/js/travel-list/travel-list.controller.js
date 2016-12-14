(function(){
  'use strict';

  angular
    .module('Csi.travelList')
    .controller('TravelListCtrl', TravelListCtrl);

  /** @ngInject */
  function TravelListCtrl(travelListData){ // data is from Home resolve in router 

    var travelList = this;

    travelList.tab1 = [];
    travelList.tab2 = [];
    travelList.tab3 = [];
    
    activate();

    ///////////////////////////////////////

    function activate(){
      
      travelList.tab1 = travelListData.tab1;
      travelList.tab2 = travelListData.tab2;
      travelList.tab3 = travelListData.tab3;

    }

  }

}());