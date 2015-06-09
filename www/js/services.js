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
      fangebot = JSON.parse(window.localStorage.fangebot || '{}');
        for (var entry in fangebot){
        if(fangebot[entry].id == fangebotId)
            return (fangebot[entry]);
          }
    },
    split: function(data){
      window.localStorage.fangebot = JSON.stringify(data);
      return data;
    },
    split_sport: function(data) {
      window.localStorage.sportFangebot = JSON.stringify(data);
			return data;
    },
    split_unterhaltung: function(data) {
      window.localStorage.unterhaltungFangebot = JSON.stringify(data);
			return data;
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
.factory('Sbrett', function(){


  	// Definition der Funktionen
  	return{
		all: function(){
      return JSON.parse(window.localStorage.blackboard || '{}');
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
      get_offers = function(){
        blackboard = JSON.parse(window.localStorage.blackboard || '{}');
        offers = [];
        for (var entry in blackboard){
        if(blackboard[entry].request === false)
            offers.push(blackboard[entry]);
        }
        return offers;
      };
      var offerBlackboard = get_offers();
	  	var offers = [ ];
	  	// Schleife für Elemente in Request
	  	for (var  i in offerBlackboard){
	  		if(offerBlackboard[i].category_id == categoriesId)
	  			offers.push(offerBlackboard[i]);
	  	}
			return offers;
		},
		all_requests_in_category: function(categoriesId){
      get_requests = function(){
        blackboard = JSON.parse(window.localStorage.blackboard || '{}');
        requests = [];
        for (var entry in blackboard){
        if(blackboard[entry].request === true)
            requests.push(blackboard[entry]);
        }
        return requests;
      };
      requestBlackboard = get_requests();
	  	var requests = [ ];
	  	// Schleife für Elemente in Request
	  	for (var  i in requestBlackboard){
	  		if(requestBlackboard[i].category_id == categoriesId)
	  			requests.push(requestBlackboard[i]);
	  	}
			return requests;
		},
		get_blackboard: function(itemId){
      blackboard = JSON.parse(window.localStorage.blackboard || '{}');
			for (var entry in blackboard){
				if(blackboard[entry].id == itemId)
					return (blackboard[entry]);
			}
  	},
		split_categories: function(data){
			window.localStorage.categories = JSON.stringify(data);
			return data;
		},
    split_blackboard: function(data){
			window.localStorage.blackboard = JSON.stringify(data);
			return data;
		},
	};
})



//Wohnungsmarkt Service
.factory('Wohnung', function(){

	//Definition der Funktionen
	return {
    all: function(){
      return JSON.parse(window.localStorage.apartment || '{}');
    },
		all_offer: function(){
      offer = JSON.parse(window.localStorage.apartment || '{}');
      offer_return=[];
      for (var i = 0; i < offer.length; i++){
        if(offer[i].request === false)
            offer_return.push(offer[i]);
      }
      return offer_return;
		},
		all_request: function(){
      request = JSON.parse(window.localStorage.apartment || '{}');
      request_return=[];
      for (var i = 0; i < request.length; i++){
        if(request[i].request === true)
            request_return.push(request[i]);
      }
      return request_return;
		},
		get: function(wohnungsId) {
      apartment = JSON.parse(window.localStorage.apartment || '{}');
		  for (var entry in apartment){
				if(apartment[entry].id == wohnungsId)
					return (apartment[entry]);
			}
		},
    split: function(data){
      window.localStorage.apartment = JSON.stringify(data);
      return data;
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
