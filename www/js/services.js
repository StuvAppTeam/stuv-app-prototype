angular.module('starter.services', [])

.factory('News', function($http){
	
	var news = [];
  
  	
  
  	$http.get('Testdaten/News.json').success(function(data,status){
  		for (var i = 0; i < data.length; i++){
  			news.push(data[i]);
  		}
  	})
  
  	
  
  return {
  	all: function() {
  		return news;
  	},
  	get: function(newsId){
  		return news[newsId];
  	},
  	all_stuv: function() {
  		var stuvnews = [ ];
  		for(var article in news){
  			if(news[article].author == 'stuv')
  			 stuvnews.push(news[article]);
  		};
  		return stuvnews;
  	},
  	all_dhbw: function() {
		var dhbwnews = [ ];
		for(var article in news){
			if(news[article].author == 'dhbw')
			 dhbwnews.push(news[article]);
		};
	return dhbwnews;
	},
	push_news: function(newNews){
		for (var i = 0; i < newNews.length; i++){
  			news.push(newNews[i]);
  		}
	}
  };
	
})

.factory('Mensa', function(){
	
	var speiseplan = [{day: 'Montag', menu1: 'Schnitzel mit Pommes', menu2: 'Gemüseauflauf', id: 0}, 
				{day: 'Dienstag', menu1: 'Schnitzel mit Pommes', menu2: 'Gemüseauflauf', id: 1},
				{day: 'Mittwoch', menu1: 'Schnitzel mit Pommes', menu2: 'Gemüseauflauf', id: 2},
				{day: 'Donnerstag', menu1: 'Schnitzel mit Pommes', menu2: 'Gemüseauflauf', id: 3},
				{day: 'Freitag', menu1: 'Schnitzel mit Pommes', menu2: 'Gemüseauflauf', id: 4}];
				
	return{
		all: function(){
			return speiseplan;
		}
	}
})

.factory('Fangebot', function(){
	
	var fangebot = [{title: 'Fußball', description: 'lorem ipsum........', contact: 'Max Mustermann', contact_phone:'0158762362', contact_mail:'max@mustermann.com', location: 'Sporthalle Weststadt', location_adress: 'Bergstr.25', category: 'sport' , id: 0},
				{title: 'Basketball', description: 'lorem ipsum........', contact: 'Max Mustermann', contact_phone:'0158762362', contact_mail:'max@mustermann.com', location: 'Sporthalle Weststadt', location_adress: 'Bergstr.25', category: 'sport' , id: 1},
				{title: 'Volleyball', description: 'lorem ipsum........', contact: 'Max Mustermann', contact_phone:'0158762362', contact_mail:'max@mustermann.com', location: 'Sporthalle Weststadt', location_adress: 'Bergstr.25', category: 'sport', id: 2},
				{title: 'Badminton', description: 'lorem ipsum........', contact: 'Max Mustermann', contact_phone:'0158762362', contact_mail:'max@mustermann.com', location: 'Sporthalle Weststadt', location_adress: 'Bergstr.25', category: 'sport', id: 3},
				{title: 'Turnen', description: 'lorem ipsum........', contact: 'Max Mustermann', contact_phone:'0158762362', contact_mail:'max@mustermann.com', location: 'Sporthalle Weststadt', location_adress: 'Bergstr.25', category: 'sport', id: 4},
				{title: 'Tanzen', description: 'lorem ipsum........', contact: 'Max Mustermann', contact_phone:'0158762362', contact_mail:'max@mustermann.com', location: 'Sporthalle Weststadt', location_adress: 'Bergstr.25', category: 'sport', id: 5},
				{title: 'Fotogruppe',description: 'lorem ipsum........', contact: 'Max Mustermann', contact_phone:'0123991321', contact_mail:'max@mustermann.com', location: 'Sporthalle Weststadt', location_adress: 'Bergstr.25', category: 'unterhaltung', id: 6},
				{title: 'Namen tanzen', description: 'lorem ipsum........',contact: 'Max Mustermann', contact_phone:'0123991321', contact_mail:'max@mustermann.com', location: 'Sporthalle Weststadt', location_adress: 'Bergstr.25', category: 'unterhaltung', id: 7},
				{title: 'Geocaching', description: 'lorem ipsum........', contact: 'Max Mustermann', contact_phone:'0123991321', contact_mail:'max@mustermann.com', location: 'Sporthalle Weststadt', location_adress: 'Bergstr.25', category: 'unterhaltung', id: 8}];
	
	
	return {
		all: function(){
			return fangebot;
		},
		
	  	get: function(fangebotId){
  			return fangebot[fangebotId];
  		},  	
  		
  		all_sport: function() {
  			var sportfangebot = [ ];
  			for(var activity in fangebot){
  				if(fangebot[activity].category == 'sport')
  			 	sportfangebot.push(fangebot[activity]);
  			};
  			return sportfangebot;
  		},
  		
  		all_unterhaltung: function() {
			var unterhaltungfangebot = [ ];
			for(var activity in fangebot){
				if(fangebot[activity].category == 'unterhaltung')
			 	unterhaltungfangebot.push(fangebot[activity]);
			};
			return unterhaltungfangebot;
		}
	}
})

.factory('Kalender', function(){
	
	var dat = new Date();
	var week = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
	var anzeige = [{name: week[dat.getDay()], date: dat.getDate(), month: dat.getMonth(), year: dat.getFullYear(), id: 0}];
	var date = new Date();
	for(var i = 1; i < 7; i++){
		date.setTime(dat.getTime() + (i * 86400000));
		anzeige.push({name: week[date.getDay()], date: date.getDate(), month: date.getMonth(), year: date.getFullYear() , id: i});
	};
	
	var events = 	[{title: 'Clubnacht', description: 'blablalablalalsldalsdnlakbndjksbgklsbgjklsbjkdsvkslnvjlsbaslbvjklsabfdjlksa', location: 'Hugos Ravensburg', date: '14.11.2014', id: 0},
					{title: 'Ladys Night', description: 'blablalablalalsldalsdnlakbndjksbgklsbgjklsbjkdsvkslnvjlsbaslbvjklsabfdjlksa', location: 'Hugos Ravensburg', date: '14.11.2014', id: 1},
					{title: 'Test1', description: 'blablalablalalsldalsdnlakbndjksbgklsbgjklsbjkdsvkslnvjlsbaslbvjklsabfdjlksa', location: 'Hugos Ravensburg', date: '14.11.2014', id: 2},
					{title: 'Test2', description: 'blablalablalalsldalsdnlakbndjksbgklsbgjklsbjkdsvkslnvjlsbaslbvjklsabfdjlksa', location: 'Hugos Ravensburg', date: '14.11.2014', id: 3}];
					
	return{
		get_dates: function(){
			return anzeige;
		}
	}
})

.factory('Campus', function(){
	var standorte = [{name: 'Marienplatz', adress: 'Marienplatz 1', plz: '88212', city: 'Ravensburg', description: 'Im Gebäude Marienplatz 2 sind das Rektorat, die Verwaltung sowie die Stabstellen des Rektorats untergebracht. Zudem finden Sie hier die Studiengänge Wirtschaftsinformatik und Wirtschaftsingenieurwesen, das TV- und Hörfunkstudio sowie das Mac-Labor des Studiengangs Mediendesign. ', time: '7:00 - 22:30', id: 0},
					{name: 'Kloesterle', adress: 'Rudolfstraße 123', plz: '88212', city: 'Ravensburg', description: 'Im „Klösterle“ in der Rudolfstraße 19 finden Sie die DHBW-Bibliothek des Campus Ravensburg, das Kulinarische Entwicklungszentrum sowie die betriebswirtschaftlichen Studiengänge Tourismus, Hotellerie und Gastronomie mit den vier Vertiefungsrichtungen Reiseverkehrsmanagement, Hotel- und Gastronomiemanagement, Destinations- und Kurortemanagement sowie Freizeitwirtschaft.', time: '7:00 - 22:30', id: 1},
					{name: 'Rudolfstraße', adress: 'Rudolfstraße 1', plz: '88212', city: 'Ravensburg', description: 'In der Rudolfstraße 11 finden Sie die Studiengänge Handel Plus sowie Messe-, Kongress- und Eventmanagement.  Das Wohnprojekt „Beziehungsweise“ im Dachgeschoss des Gebäudes bietet jungen Menschen mit und ohne Behinderung bezahlbaren Wohnraum mit der Möglichkeit zu bürgerschaftlichem Engagement und sozialem Lernen.', time: '7:00 - 22:30', id: 2},
					{name: 'Oberamteigasse', adress: 'Oberamteigasse 1', plz: '88212', city: 'Ravensburg', description: 'Im Gebäude Oberamteigasse 4 sind die Studiengänge Medien- und Kommunikationswirtschaft mit den drei Vertiefungen Journalismus – PR, Verlage – Hörfunk – TV und Werbung sowie der Studiengang Mediendesign untergebracht.', time: '7:00 - 22:30', id: 3},
					{name: 'Marktstraße', adress: 'Marktstraße 1', plz: '88212', city: 'Ravensburg', description: 'Am Standortmarktstraße sind die Studiengänge Industrie, International Business sowie Bank zu finden. Ferner finden Sie hier auch den Verein der Förderer und Alumni der Dualen Hochschule Ravensburg e.V.', time: '7:00 - 22:30', id: 4},
					{name: 'Weinbergstraße', adress: 'Weinbergstraße 17', plz: '88212', city: 'Ravensburg', description: 'In der Weinbergstraße 17 finden Sie die Studiengänge Handel – Vertriebsmanagement, Handel – Textilmanagement, Finanzdienstleistungen sowie die Vertiefungsrichtung Medien- und Kommunikationswirtschaft: Digitale Medien.', time: '7:00 - 22:30', id: 5}];
					
	return {
		all: function(){
			return standorte;
		},
		get: function(standorteId){
			return standorte[standorteId];
		}
	}
})

.factory('Sbrett', function($http){
	
	var offerBlackboard = [];
	var categories = [];
	var requestBlackboard = [];
	
	
  	$http.get('Testdaten/OfferBlackboard.json').success(function(data,status){
  		for (var i = 0; i < data.length; i++){
  			offerBlackboard.push(data[i]);
  		}
  	});
  	
  	$http.get('Testdaten/RequestBlackboard.json').success(function(data,status){
  		for (var i = 0; i < data.length; i++){
  			requestBlackboard.push(data[i]);
  		}
  	});
  	
  	$http.get('Testdaten/Category.json').success(function(data,status){
  		for (var i = 0; i < data.length; i++){
  			categories.push(data[i]);
  		}
  	});
  	
  // Request JSON einbinden	
  	return{
		all: function(){
			return offerBlackboard;
		},
		all_categories: function(){
			return categories;
		},
		get: function(categoriesId){
		return categories[categoriesId];
	  	},
	  	all_offers_in_category: function(categoriesId){
	  		
	  	var offers = [ ];
	  	// Schleife für Elemente in Request
	  	for (var  i in offerBlackboard){
	  		if(offerBlackboard[i].categoryid-1 == categoriesId)
	  			offers.push(offerBlackboard[i]);
	  	}
	
		return offers;
		},
		all_requests_in_category: function(categoriesId){
	  		
	  	var requests = [ ];
	  	// Schleife für Elemente in Request
	  	for (var  i in requestBlackboard){
	  		if(requestBlackboard[i].categoryid-1 == categoriesId)
	  			requests.push(requestBlackboard[i]);
	  	}
	
		return requests;
		},
		get_entry_offer: function(itemId){

  			for (var entry in offerBlackboard){
  				if(offerBlackboard[entry].id == itemId)
  					return (offerBlackboard[entry]);
  			}
  			
  	},
		get_entry_request: function(itemId){

  			for (var entry in requestBlackboard){
  				if(requestBlackboard[entry].id == itemId)
  					return (requestBlackboard[entry]);
  			}
  			
  		}
	}
})

.factory('Wohnung', function($http){
	var OfferApartment = [];
	var RequestApartment = [];
	
	  	$http.get('Testdaten/OfferApartment.json').success(function(data,status){
  		for (var i = 0; i < data.length; i++){
  			OfferApartment.push(data[i]);
  		}
  	});
  	
  		 $http.get('Testdaten/RequestApartment.json').success(function(data,status){
  		for (var i = 0; i < data.length; i++){
  			RequestApartment.push(data[i]);
  		}
  	});
	
	return {
		all_offer: function(){
			return OfferApartment;
		},
		all_request: function(){
			return RequestApartment;
		},
		get_entry_offer: function(wohnungsId) {
			  for (var entry in OfferApartment){
  				if(OfferApartment[entry].id == wohnungsId)
  					return (OfferApartment[entry]);
				}
	},
			get_entry_request: function(wohnungsId) {
			  for (var entry in RequestApartment){
  				if(RequestApartment[entry].id == wohnungsId)
  					return (RequestApartment[entry]);
				}
	}
	}
})
