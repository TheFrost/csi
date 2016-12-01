(function() {
  'use strict';

  var MapCtrl = function () {

    var map = this;

    map.data = { center: { latitude: 45, longitude: -73 }, zoom: 8 };

  };


  angular
    .module('Csi.map')
    .controller('MapCtrl', MapCtrl);

}());
