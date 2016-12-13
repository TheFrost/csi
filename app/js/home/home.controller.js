(function() {
  'use strict';


  angular.module('Csi.home')
    .controller('HomeCtrl', HomeCtrl);
    

  /**
  * @ngInject
  */
  function HomeCtrl(homeFactory, $timeout, $scope) {

    var home = this;

    home.shortcuts = {};
    home.travels = [];
    home.hasTravels = false;
    home.slides = [];

    ///////////////////////////////////

    // Private Methods
    function _renderShortcuts(shortcuts) {
      angular.forEach(shortcuts, function (value) {
        home.shortcuts[Object.keys(value)[0]] = value[Object.keys(value)[0]] == 'true' ? true : false;
      });
    }

    function _renderSurvillanceTravels(travels) {

      /*Hardcode*/
      /*travels = [
        {
          Claims: 0,
          Destination:'RIVERA',
          ETA:'2016-09-07T18:28:00',
          IdViaje:'160907022',
          Origin:'CSI DISTRIBUCION',
          Score: 0,
          Status:'ASIGNADO',
          StatusId: 1,
          Survillance: 0,
          Vins:'1'
        },
        {
          Claims: 0,
          Destination:'RIVERA',
          ETA:'2016-09-07T18:28:00',
          IdViaje:'160907022',
          Origin:'CSI DISTRIBUCION',
          Score: 0,
          Status:'CARGANDO',
          StatusId: 2,
          Survillance: 0,
          Vins:'1'
        },
        {
          Claims: 0,
          Destination:'RIVERA',
          ETA:'2016-09-07T18:28:00',
          IdViaje:'160907022',
          Origin:'CSI DISTRIBUCION',
          Score: 0,
          Status:'EN TRANSITO',
          StatusId: 3,
          Survillance: 0,
          Vins:'1'
        },
        {
          Claims: 0,
          Destination:'RIVERA',
          ETA:'2016-09-07T18:28:00',
          IdViaje:'160907022',
          Origin:'CSI DISTRIBUCION',
          Score: 0,
          Status:'POR LLEGAR',
          StatusId: 4,
          Survillance: 0,
          Vins:'1'
        },
        {
          Claims: 0,
          Destination:'RIVERA',
          ETA:'2016-09-07T18:28:00',
          IdViaje:'160907022',
          Origin:'CSI DISTRIBUCION',
          Score: 0,
          Status:'ENTREGADO',
          StatusId: 5,
          Survillance: 0,
          Vins:'1'
        },
      ];*/
      /*end hardcode*/

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

    // Fetch
    $scope.$emit('loading');
    homeFactory.getData()
      .then(
        function (data) {
          _renderShortcuts(data.shortcuts);
          _renderSurvillanceTravels(data.survillance);
          _renderHomeSlider(data.slides);

          $scope.$emit('loaded');
        }
      );

  }

}());
