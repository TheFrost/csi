(function(){
  'use strict';

  angular
    .module('Csi.travelList')
    .controller('TravelListCtrl', TravelListCtrl);

  /** @ngInject */
  function TravelListCtrl($stateParams, travelListData){ // data is from Home resolve in router 

    var travelList = this;

    travelList.tab1 = [];
    travelList.tab1Surv = [];
    travelList.tab2 = [];
    travelList.tab2Surv = [];
    travelList.tab3 = [];
    travelList.tab3Surv = [];

    travelList.pending = $stateParams.pending ? true : false;
    
    activate();

    ///////////////////////////////////////

    function activate(){
      
      travelList.tab1 = travelListData.tab1;
      travelList.tab1Surv = travelListData.tab1Surv;
      travelList.tab2 = travelListData.tab2;
      travelList.tab2Surv = travelListData.tab2Surv;
      travelList.tab3 = travelListData.tab3;
      travelList.tab3Surv = travelListData.tab3Surv;

    }

  }

}());