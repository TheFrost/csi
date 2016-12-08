(function() {
  'use strict';

  function HomeCtrl(HomeService, FlickityService, $timeout, $scope) {

    var home = this;

    home.shortcuts = {};
    home.travels = [];
    home.hasTravels = false;
    home.slides = [];
    home.flickityOptions = {};


    var slideInstance = 'homeSlider';


    // Private Methods
    function _initSlider() {
      home.flickityOptions = {
        cellSelector: '.o-slider__slide',
        prevNextButtons: false,
        wrapAround: true,
        autoPlay: 5000,
        pauseAutoPlayOnHover: false,
        draggable: false
      };

      var slider = angular.element(document.getElementById(slideInstance));

      $timeout(function () {
        FlickityService.create(slider[0], slideInstance, home.flickityOptions);
      }, 0);
    }

    function _renderShortcuts(shortcuts) {
      angular.forEach(shortcuts, function (value) {
        home.shortcuts[Object.keys(value)[0]] = value[Object.keys(value)[0]] == 'true' ? true : false;
      });
    }

    function _renderSurvillanceTravels(travels) {
      home.travels = travels;
      home.hasTravels = true;
    }

    function _renderHomeSlider(slides) {
      // home.slides = slides;
      home.slides = [
        'img/img-portada.jpg',
        'https://www.grupomavesa.com.ec/cms/uploads/citroen/images/slider3.jpg',
        'http://urbanlifestylechic.com/wp-content/uploads/2014/03/Ftype-R.jpg'
      ];

      _initSlider();
    }

    // Fetch
    $scope.$emit('loading');
    HomeService.getData()
      .then(
        function (data) {
          _renderShortcuts(data.shortcuts);
          _renderSurvillanceTravels(data.survillance);
          _renderHomeSlider(data.slides);

          $scope.$emit('loaded');
        }
      );


    // Bind events
    $scope.$on('$destroy', function () {
      $timeout(function () {
        FlickityService.destroy(slideInstance);
      }, 1000);
    });

  }
  HomeCtrl.$inject = ['HomeService', 'FlickityService', '$timeout', '$scope'];


  angular.module('Csi.home')
    .controller('HomeCtrl', HomeCtrl);


}());
