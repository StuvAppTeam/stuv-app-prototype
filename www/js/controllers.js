angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {

})



// Controller für die Anzeige der News
.controller('NewsCtrl', function($scope, $http, News) {
	// Initialisierung der Arrays über Service Funktionen
	$scope.allNews = News.all();
	$scope.stuvNews = News.all_stuv();
	$scope.dhbwNews = News.all_dhbw();

	// Deklaration der update Methode
	// Abrufen der Daten über HTTP Request und anschließendes persistieren im localStorage
	// über die .split Methoden des Services
	$scope.update = function(){
		var stuvnews = [];
		var dhbwnews = [];
		$http.get('http://stuvapp.herokuapp.com/dhbw_news.json')
		.success(function(data,status){
  		for (var i = 0; i < data.length; i++){
				if(data[i].stuv === true)
					stuvnews.push(data[i]);
				if(!data[i].stuv)
					dhbwnews.push(data[i]);
			}
			$scope.allNews = News.split(data);
			$scope.dhbwNews = News.split_dh(dhbwnews);
			$scope.stuvNews = News.split_stuv(stuvnews);

		})
		.finally(function() {
				// Stop the ion-refresher from spinning
				$scope.$broadcast('scroll.refreshComplete');
			});
	};

	// Abrufen der Daten bei Initialisierung
	$scope.update();

	// Aktualisierung der Anzeige nach einem swipe Down des Benutzers
	// über die Methode update
	$scope.swipeDown = function() {
  		$scope.update();
	};

})



// Controller für die Anzeige einzelner Artikel
// Zugriff auf ein einzelnes Objekt über die Methode get aus dem Service
.controller('NewsItemCtrl', function($scope, $stateParams, News) {
	$scope.news = News.get($stateParams.newsId);
})



// Controller für die Anzeige des Mensaplans
.controller('MensaCtrl', function($scope, Mensa, $http) {
	$scope.fullPlan = Mensa.all();

	$scope.update = function(){
		$http.get('http://stuvapp.herokuapp.com/mensas.json').success(function(data,status){
			$scope.fullPlan = Mensa.split(data);
		})
		.finally(function() {
				// Stop the ion-refresher from spinning
				$scope.$broadcast('scroll.refreshComplete');
			});
	};

	$scope.update();

	$scope.swipeDown = function(){
		$scope.update();
	};
})



// Controller für das Erstellen von Aufklappmenüs
.controller('GroupCtrl', function($scope) {
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
})



//Controller für die Anzeige der Freizeitangebote
.controller('FangebotCtrl', function($scope, Fangebot, $http) {
	$scope.sportFangebot = Fangebot.all_sport();
	$scope.unterhaltungFangebot = Fangebot.all_unterhaltung();
	$scope.Fangebot = Fangebot.all();

	$scope.update = function(){
		$http.get('http://stuvapp.herokuapp.com/activities.json').success(function(data,status){
			$scope.Fangebot = Fangebot.split(data);
		})
		.finally(function() {
				// Stop the ion-refresher from spinning
				$scope.$broadcast('scroll.refreshComplete');
			});
	};

	$scope.update();

	$scope.swipeDown = function(){
		$scope.update();
	};
})




//Controller für die Anzeige der einzelnen Aktivitäten
.controller('FangebotItemCtrl', function($scope, $stateParams, Fangebot) {
	$scope.fangebot = Fangebot.get($stateParams.fangebotId);
})




//Controller für die Auswahl eines Campus-Gebäudes
.controller('CampusCtrl', function($scope, Campus, $http){
	$scope.standorte = Campus.all();

	$scope.update = function(){
		$http.get('http://stuvapp.herokuapp.com/campus.json').success(function(data,status){
			$scope.standorte = Campus.split(data);
		})
		.finally(function() {
				// Stop the ion-refresher from spinning
				$scope.$broadcast('scroll.refreshComplete');
			});
	};
	$scope.update();
})



//Controller für die Anzeige der Gebäude
.controller('CampusItemCtrl', function($scope, $stateParams, Campus){
	$scope.standorte = Campus.get($stateParams.campusId);
})



.controller('SbrettCtrl', function($scope, Sbrett, $http){
	$scope.OfferBlackboard = Sbrett.all();
	$scope.Categories = Sbrett.all_categories();


	$scope.update = function(){
		$http.get('http://stuvapp.herokuapp.com/categories.json').success(function(data,status){
			$scope.Categories = Sbrett.split_categories(data);
		})
		.finally(function() {
				// Stop the ion-refresher from spinning
				$scope.$broadcast('scroll.refreshComplete');
			});
	};
	$scope.update();
})



.controller('SbrettCategoryCtrl', function($scope, $stateParams, Sbrett) {
	$scope.Offer = Sbrett.all_offers_in_category($stateParams.categoriesId);
	$scope.Request = Sbrett.all_requests_in_category($stateParams.categoriesId);
	$scope.categories = Sbrett.get($stateParams.categoriesId);
})



.controller('SbrettCategoryItemCtrlOffer', function($scope, $stateParams, Sbrett) {
	$scope.item = Sbrett.get_entry_offer($stateParams.itemId);
})



.controller('SbrettCategoryItemCtrlRequest', function($scope, $stateParams, Sbrett) {
	$scope.item = Sbrett.get_entry_request($stateParams.itemId);
})



//Controller für die Auswahl einer Wohnung
.controller('WohnungCtrl', function($scope, Wohnung){
	$scope.OfferApartment = Wohnung.all_offer();
	$scope.RequestApartment = Wohnung.all_request();
})



//Controller für einzelene Wohnungen
.controller('WohnungItemCtrlOffer', function($scope, $stateParams, Wohnung) {
	$scope.Wohnungitem = Wohnung.get_entry_offer($stateParams.wohnungsId);
})



//Controller für einzelnen Wohnung
.controller('WohnungItemCtrlRequest', function($scope, $stateParams, Wohnung) {
	$scope.Wohnungitem = Wohnung.get_entry_request($stateParams.wohnungsId);
})



//Controller für die Anzeige der Gebäude
.controller('CampusItemCtrl', function($scope, $stateParams, Campus){
	$scope.standorte = Campus.get($stateParams.campusId);
})



// Controller für den Abruf der Bilder vom Backend
.controller('ImageCtrl', function($scope, Image, $http, $stateParams){
	$scope.Images = Image.all();
	$scope.CategoryImage = Image.get_category_image($stateParams.categoryId);
	$scope.update = function(){
		$http.get('http://stuvapp.herokuapp.com/images.json').success(function(data,status){
			$scope.Images = Image.split(data);
		})
		.finally(function() {
				// Stop the ion-refresher from spinning
				$scope.$broadcast('scroll.refreshComplete');
			});
	};
	$scope.update();
})



// Controller für die GoogleMaps API
.controller('MapCtrl', function($scope, $ionicLoading) {
  $scope.mapCreated = function(map) {
    $scope.map = map;
  };

	$scope.setMarker = function(campus){
		Marker = new google.maps.Marker({
							position: new google.maps.LatLng(47.77975,9.613589999999931),
							map: $scope.map
					});
	};

  $scope.centerOnMe = function () {
    console.log("Centering");
    if (!$scope.map) {
      return;
    }

    $scope.loading = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });

    navigator.geolocation.getCurrentPosition(function (pos) {
      console.log('Got pos', pos);
      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      $scope.loading.hide();
    }, function (error) {
      alert('Unable to get location: ' + error.message);
    });
  };
});
