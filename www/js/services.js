angular.module('starter.services', [])



// News Service
.factory('News', function($http,$filter){

  // Definition der Funktionen
	// Verwendung des LocalStorage benötigt das Parsen in das JSON Format
	// Zur Rückgabe muss dieses wieder aufgelöst werden
  return {
  	all: function() {
  		return JSON.parse(window.localStorage.news || '{}');
  	},
  	get: function(newsId){
			news = JSON.parse(window.localStorage.news || '{}');
  		  for (var entry in news){
  			if(news[entry].id == newsId)
  					return (news[entry]);
  				}
  	},
  	all_stuv: function() {
  		return JSON.parse(window.localStorage.stuv_news || '{}');
  	},
  	all_dhbw: function() {
			return JSON.parse(window.localStorage.dhbw_news || '{}');
		},
		split: function(data){
			window.localStorage.news = JSON.stringify(data);
			return data;
		},
		split_dh: function(data){
			window.localStorage.dhbw_news = JSON.stringify(data);
			return data;
		},
		split_stuv: function(data){
			window.localStorage.stuv_news = JSON.stringify(data);
			return data;
		}
  };
})



// Speiseplan Service
.factory('Mensa', function(){

	var speiseplan = [];


		return{
			all: function(){
        return JSON.parse(window.localStorage.speiseplan || '{}');
			},
			get: function(speiseplanTs){
        speiseplan = JSON.parse(window.localStorage.speiseplan || '{}');
    		  for (var entry in speiseplan){
    			if(speiseplan[entry].id == speiseplanTs)
    					return (speiseplan[entry]);
    				}
			},
      split: function(data){
  			window.localStorage.speiseplan = JSON.stringify(data);
			return data;
      }
    };
})



// Freizeitangebot Service
.factory('Fangebot', function(){

  return{
    all: function(){
      return JSON.parse(window.localStorage.fangebot || '{}');
    },
    get: function(fangebotId){
      speiseplan = JSON.parse(window.localStorage.fangebot || '{}');
        for (var entry in fangebot){
        if(fangebot[entry].id == fangebotId)
            return (fangebot[entry]);
          }
    },
    split: function(data){
      window.localStorage.fangebot = JSON.stringify(data);
      return data;
    },
    all_sport: function() {
      var sportfangebot = [ ];
      var fangebot = window.localStorage.fangebot;
      for(var activity in fangebot){
        if(fangebot[activity].type == 'Sport')
         sportfangebot.push(fangebot[activity]);
      }
      return sportfangebot;
    },
    all_unterhaltung: function() {
      var unterhaltungfangebot = [ ];
      var fangebot = window.localStorage.fangebot;
      for(var activity in fangebot){
        if(fangebot[activity].type == 'Unterhaltung')
         unterhaltungfangebot.push(fangebot[activity]);
      }
      return unterhaltungfangebot;
    }
  };
})



//Campus Service
.factory('Campus', function(){

	//Definition der Funktionen
	return {
		all: function(){
			return JSON.parse(window.localStorage.campus || '{}');
		},
		get: function(campusId){
			campus = JSON.parse(window.localStorage.campus || '{}');
  		  for (var entry in campus){
  			if(campus[entry].id == campusId)
  					return (campus[entry]);
  				}
  	},
		split: function(data){
			window.localStorage.campus = JSON.stringify(data);
			return data;
		}
	};
})



//Schwarzes Brett Service
.factory('Sbrett', function($http){

	var offerBlackboard = [];
	var requestBlackboard = [];

	//Laden der Angebote des schwarzen Bretts
  	$http.get('https://stuvapp.herokuapp.com/offer_blackboards.json').success(function(data,status){
  		for (var i = 0; i < data.length; i++){
  			offerBlackboard.push(data[i]);
  		}
  	});

  	//Laden der Gesuche des schwarzen Bretts
  	$http.get('Testdaten/RequestBlackboard.json').success(function(data,status){
  		for (var i = 0; i < data.length; i++){
  			requestBlackboard.push(data[i]);
  		}
  	});

  	// Definition der Funktionen
  	return{
		all: function(){
			return offerBlackboard;
		},
		all_categories: function(){
			return JSON.parse(window.localStorage.categories || '{}');
		},
		get: function(categoriesId){
      categories = JSON.parse(window.localStorage.categories || '{}');
  		  for (var entry in categories){
  			if(categories[entry].id == categoriesId)
  					return (categories[entry]);
	      }
		},
  	all_offers_in_category: function(categoriesId){
	  	var offers = [ ];
	  	// Schleife für Elemente in Request
	  	for (var  i in offerBlackboard){
	  		if(offerBlackboard[i].category_id == categoriesId)
	  			offers.push(offerBlackboard[i]);
	  	}
			return offers;
		},
		all_requests_in_category: function(categoriesId){
	  	var requests = [ ];
	  	// Schleife für Elemente in Request
	  	for (var  i in requestBlackboard){
	  		if(requestBlackboard[i].category_id == categoriesId)
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
		},
		split_categories: function(data){
			window.localStorage.categories = JSON.stringify(data);
			return data;
		}
	};
})



//Wohnungsmarkt Service
.factory('Wohnung', function($http){
	var OfferApartment = [];
	var RequestApartment = [];

		//Laden der Wohnungsmarkt Angebote
	  	$http.get('Testdaten/OfferApartment.json').success(function(data,status){
	  		for (var i = 0; i < data.length; i++){
	  			OfferApartment.push(data[i]);
	  		}
  		});

  		//Laden der Wohnungsmarkt Gesuche
  		$http.get('Testdaten/RequestApartment.json').success(function(data,status){
	  		for (var i = 0; i < data.length; i++){
	  			RequestApartment.push(data[i]);
	  		}
	  	});

	//Definition der Funktionen
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
	};
})

.factory('Image', function(){
  return {
    all: function(){
      return JSON.parse(window.localStorage.images || '{}');
    },
    get_category_image: function(categoryId){
      category_image = JSON.parse(window.localStorage.images || '{}');
        for (var entry in category_image){
          if(category_image[entry].category_id == categoryId)
            return (category_image[entry]);
        }
    },
    split: function(data){
      window.localStorage.images = JSON.stringify(data);
			return data;
    }
  };
});
