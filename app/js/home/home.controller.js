(function() {
  'use strict';


  angular.module('Csi.home')
    .controller('HomeCtrl', HomeCtrl);


  /**
  * @ngInject
  */
  function HomeCtrl(homeData) { // data is from Home resolve in router 

    var home = this;

    home.shortcuts = {};
    home.travels = [];
    home.hasTravels = false;
    home.slides = [];

    activate();

    ///////////////////////////////////

    function _renderShortcuts(shortcuts) {
      angular.forEach(shortcuts, function (value) {
        home.shortcuts[Object.keys(value)[0]] = value[Object.keys(value)[0]] == 'true' ? true : false;
      });
    }

    function _renderSurvillanceTravels(travels) {
      if (travels.length) {
        home.travels = travels;
        home.hasTravels = true;
      }
    }

    function _renderHomeSlider(slides) {
      // home.slides = slides;
      home.slides = [
        'img/img-portada.jpg',
        'https://www.grupomavesa.com.ec/cms/uploads/citroen/images/slider3.jpg',
        'http://urbanlifestylechic.com/wp-content/uploads/2014/03/Ftype-R.jpg'
      ];
    }

    function activate() {
      _renderShortcuts(homeData.shortcuts);
      _renderSurvillanceTravels(homeData.survillance);
      _renderHomeSlider(homeData.slides);
    }

  }

}());
