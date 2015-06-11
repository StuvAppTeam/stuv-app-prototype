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
		$http.get('http://46.101.160.142/dhbw_news.json')
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







// Controller für das Erstellen von Aufklappmenüs
.controller('GroupCtrl', function($scope) {
    // Berechnung des aktuellen Tages fuer Mensaplan
    var datum = new Date();
    for (elem in $scope.fullPlan) {

        var today = new Date(Date.parse(datum) - $scope.fullPlan[elem].timestamp);
        var daydiff = today.getDate() - 1;
        if (daydiff == 0){
            $scope.timestamp = $scope.fullPlan[elem].timestamp;
        }
    }


    // Funktion zum anzeigen der Elemente beim klicken
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	// Prüft ob aktuelle Gruppe
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;

	};
	// Zeigt aktuellen Tag aufgeklappt an
		$scope.toggleGroup($scope.timestamp);
})


// Controller für die Anzeige des Mensaplans
.controller('MensaCtrl', function($scope, Mensa, $http, $ionicLoading) {
	$scope.fullPlan = Mensa.all();

	$scope.update = function(){
		$http.get('http://46.101.160.142/mensas.json').success(function(data,status){
			$scope.fullPlan = Mensa.split(data);
		})
		.finally(function() {
			// Stop the ion-refresher from spinning
			$scope.$broadcast('scroll.refreshComplete');
		})
	};

	$scope.update();
	$scope.swipeDown = function(){
		$scope.update();
	};


})



//Controller für die Anzeige der Freizeitangebote
.controller('FangebotCtrl', function($scope, Fangebot, $http) {

	$scope.update = function(){
		var sport = [];
		var unterhaltung = [];
		$http.get('http://46.101.160.142/activities.json').success(function(data,status){
			for (var i = 0; i < data.length; i++){
				if(data[i].activity_type === "Sport")
					sport.push(data[i]);
				if(data[i].activity_type === "Unterhaltung")
					unterhaltung.push(data[i]);
			}
			$scope.sportFangebot = Fangebot.split_sport(sport);
			$scope.unterhaltungFangebot = Fangebot.split_unterhaltung(unterhaltung);
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
		$http.get('http://46.101.160.142/campus.json').success(function(data,status){
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

	$scope.update_blackboard = function(){
		$http.get('http://46.101.160.142/offer_blackboards.json').success(function(data,status){
  		$scope.OfferBlackboard = Sbrett.split_blackboard(data);
  	})
		.finally(function() {
				// Stop the ion-refresher from spinning
				$scope.$broadcast('scroll.refreshComplete');
			});
	};

	$scope.update = function(){
		$http.get('http://46.101.160.142/categories.json').success(function(data,status){
			$scope.Categories = Sbrett.split_categories(data);
		})
		.finally(function() {
				// Stop the ion-refresher from spinning
				$scope.$broadcast('scroll.refreshComplete');
			});
	};
	$scope.update();
	$scope.update_blackboard();
	$scope.swipeDown = function(){
		$scope.update();
		$scope.update_blackboard();
	}

})



.controller('SbrettCategoryCtrl', function($scope, $stateParams, $http,Sbrett) {
	$scope.Offer = Sbrett.all_offers_in_category($stateParams.categoriesId);
	$scope.Request = Sbrett.all_requests_in_category($stateParams.categoriesId);
	$scope.categories = Sbrett.get($stateParams.categoriesId);
	$scope.update_blackboard = function(){
		$http.get('http://46.101.160.142/offer_blackboards.json').success(function(data,status){
  		$scope.OfferBlackboard = Sbrett.split_blackboard(data);
  	})
		.finally(function() {
				// Stop the ion-refresher from spinning
				$scope.$broadcast('scroll.refreshComplete');
			});
	};
	$scope.update_blackboard;
	$scope.swipeDown = function(){
		$scope.update_blackboard();
	};
})



.controller('SbrettCategoryItemCtrlOffer', function($scope, $stateParams, Sbrett) {
	$scope.item = Sbrett.get_blackboard($stateParams.itemId);
})



.controller('SbrettCategoryItemCtrlRequest', function($scope, $stateParams, Sbrett) {
	$scope.item = Sbrett.get_blackboard($stateParams.itemId);
})



//Controller für die Auswahl einer Wohnung
.controller('WohnungCtrl', function($scope, Wohnung, $http){
	$scope.OfferApartment = Wohnung.all_offer();
	$scope.RequestApartment = Wohnung.all_request();
	$scope.Apartment = Wohnung.all();

	$scope.update = function(){
		$http.get('http://46.101.160.142/apartments.json').success(function(data,status){
			$scope.Apartment = Wohnung.split(data);
			$scope.OfferApartment = Wohnung.all_offer();
			$scope.RequestApartment = Wohnung.all_request();
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



//Controller für einzelene Wohnungen
.controller('WohnungItemCtrlOffer', function($scope, $stateParams, Wohnung) {
	$scope.Wohnungitem = Wohnung.get($stateParams.wohnungsId);
})



//Controller für einzelnen Wohnung
.controller('WohnungItemCtrlRequest', function($scope, $stateParams, Wohnung) {
	$scope.Wohnungitem = Wohnung.get($stateParams.wohnungsId);
})



//Controller für die Anzeige der Gebäude
.controller('CampusItemCtrl', function($scope, $stateParams, Campus){
	$scope.standorte = Campus.get($stateParams.campusId);
})





// Controller für die GoogleMaps API
.controller('MapCtrl', function($scope, $ionicLoading, Campus, Fangebot, $stateParams) {
  $scope.mapCreated = function(map) {
    $scope.map = map;
  };

	$scope.openMapCampus = function() {
		var campus = Campus.get($stateParams.campusId);
  	var address, lat, long, text;
  	address = campus.street + " " + campus.zipcode + " " + campus.city;
  	lat = parseFloat(campus.latitude);
  	long = parseFloat(campus.longitude);
  	text = encodeURIComponent(address);

  	if (ionic.Platform.isIOS()) {
    	return window.open("http://maps.apple.com/?q=" + text + "&ll=" + lat + "," + long + "&near=" + lat + "," + long, '_system', 'location=yes');
  	} else {
    	return window.open("geo:" + lat + "," + long + "?q=" + text, '_system', 'location=yes');
  	}
};

$scope.openMapFangebot = function() {
	var fangebot = Fangebot.get($stateParams.fangebotId);
	var address, lat, long, text;
	address = fangebot.street + " " + fangebot.zipcode + " " + fangebot.city;
	lat = parseFloat(fangebot.latitude);
	long = parseFloat(fangebot.longitude);
	text = encodeURIComponent(address);

	if (ionic.Platform.isIOS()) {
		return window.open("http://maps.apple.com/?q=" + text + "&ll=" + lat + "," + long + "&near=" + lat + "," + long, '_system', 'location=yes');
	} else {
		return window.open("geo:" + lat + "," + long + "?q=" + text, '_system', 'location=yes');
	}
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
