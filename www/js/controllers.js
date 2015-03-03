angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {

})
//Controller für die Anzeige der News
.controller('NewsCtrl', function($scope, $http, News) {
	$scope.allNews = News.all();
	$scope.stuvNews = News.all_stuv();
	$scope.dhbwNews = News.all_dhbw();
	
	$scope.swipeDown = function() {
		var news = [];
		var exists = false;
		$http.get('http://localhost:3000/news.json').success(function(data,status){
  		for (var i = 0; i < data.length; i++){
  			exists = false;
  			for(var j = 0; j < News.all().length; j++){	
  				if(News.all()[j].id == data[i].id)
  					exists = true;
  				}
  				if(exists == false)
  					news.push(data[i]);
  		}
  		
  		News.push_news(news);
  		})
	};
})
//Controller für die Anzeige einzelner Artikel
.controller('NewsItemCtrl', function($scope, $stateParams, News) {
	$scope.news = News.get($stateParams.newsId);
})
//Controller für die Anzeige des Mensaplans
.controller('MensaCtrl', function($scope, Mensa) {
	var date = new Date();
	var dat = date.getDate();
	var day = date.getDay();

	var woche = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];

	$scope.fullPlan = Mensa.all();

	$scope.isDay = function(dat) {
		if (dat == woche[day])
			return true;
		else
			return false;
	};
})
//Controller für das Erstellen von Aufklappmenüs
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
.controller('FangebotCtrl', function($scope, Fangebot) {
	$scope.sportFangebot = Fangebot.all_sport();
	$scope.unterhaltungFangebot = Fangebot.all_unterhaltung();
})

//Controller für die Anzeige der einzelnen Aktivitäten
.controller('FangebotItemCtrl', function($scope, $stateParams, Fangebot) {
	$scope.fangebot = Fangebot.get($stateParams.fangebotId);
})

//Controller für die Anzeige des Kalenders
.controller('KalenderCtrl', function($scope, Kalender){
	$scope.week = Kalender.get_dates();
	})

//Controller für die Auswahl eines Campus-Gebäudes
.controller('CampusCtrl', function($scope, Campus){
	$scope.standorte = Campus.all();
})

//Controller für die Anzeige der Gebäude
.controller('CampusItemCtrl', function($scope, $stateParams, Campus){
	$scope.standorte = Campus.get($stateParams.campusId);
})

.controller('SbrettCtrl', function($scope, Sbrett){
	$scope.OfferBlackboard = Sbrett.all();
	$scope.Categories = Sbrett.all_categories();
})

.controller('SbrettCategoryCtrl', function($scope, $stateParams, Sbrett) {
	$scope.Request = Sbrett.all_in_category($stateParams.categoriesId);
	$scope.categories = Sbrett.get($stateParams.categoriesId);
})

.controller('SbrettCategoryItemCtrl', function($scope, $stateParams, Sbrett) {
	$scope.item = Sbrett.get_entry($stateParams.itemId);
})

//Controller für die Auswahl einer Wohnung
.controller('WohnungCtrl', function($scope, Wohnung){
	$scope.OfferApartment = Wohnung.all();
})

//Controller für einzelene Wohnungen
.controller('WohnungItemCtrl', function($scope, $stateParams, Wohnung) {
	$scope.Wohnungitem = Sbrett.get($stateParams.wohnungsId);
})
