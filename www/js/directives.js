angular.module('starter.directives', ['starter.services'])

.directive('map', function(Campus,$stateParams) {
  return {
    restrict: 'E',
    scope: {
      onCreate: '&'
    },
    link: function ($scope, $element, $attr) {

      var campus = Campus.get($stateParams.campusId);


      function initialize() {
        var mapOptions = {
          center: new google.maps.LatLng(47.779867, 9.613103),
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map($element[0], mapOptions);
        var marker = new google.maps.Marker( {position: new google.maps.LatLng(campus.latitude,campus.longitude), map: map} );
        $scope.onCreate({map: map});

        // Stop the side bar from dragging when mousedown/tapdown on the map
        google.maps.event.addDomListener($element[0], 'mousedown', function (e) {
          e.preventDefault();
          return false;
        });
      }

      if (document.readyState === "complete") {
        initialize();
      } else {
        google.maps.event.addDomListener(window, 'load', initialize);
      }
    }
  }
});
