// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.mensa', {
      url: "/mensa",
      views: {
        'menuContent' :{
          templateUrl: "templates/mensa.html",
          controller: 'MensaCtrl'
        }
      }
    })
    
    .state('app.fangebot', {
      url: "/fangebot",
      views: {
        'menuContent' :{
          templateUrl: "templates/fangebot.html",
          controller: 'FangebotCtrl'
        }
      }
    })
    
    .state('app.fangebotitem', {
    	url: '/fangebot/:fangebotId',
    	views: {
    		'menuContent': {
    			templateUrl: 'templates/fangebotitem.html',
    			controller: 'FangebotItemCtrl'
    		}
    	}
    })

    .state('app.kalender', {
      url: "/kalender",
      views: {
        'menuContent' :{
          templateUrl: "templates/kalender.html",
          controller: 'KalenderCtrl'
        }
      }
    })
    
    .state('app.campus', {
    	url: '/campus',
    	views: {
    		'menuContent': {
    			templateUrl: 'templates/campus.html',
    			controller: 'CampusCtrl'
    		}
    	}
    })
    
    .state('app.campusitem', {
    	url: '/campus/:campusId',
    	views: {
    		'menuContent': {
    			templateUrl: 'templates/campusitem.html',
    			controller: 'CampusItemCtrl'
    		}
    	}
    })
    
    .state('app.news', {
      url: "/news",
      views: {
        'menuContent' :{
          templateUrl: "templates/news.html",
          controller: 'NewsCtrl'
        }
      }
    })

    .state('app.newsitem', {
      url: "/news/:newsId",
      views: {
        'menuContent' :{
          templateUrl: "templates/newsitem.html",
          controller: 'NewsItemCtrl'
        }
      }
    })
    
    .state('app.sbrett', {
    	url: "/sbrett",
    	views: {
    		'menuContent': {
    			templateUrl: "templates/sbrett.html",
    			controller: 'SbrettCtrl'
    			}
    		}
    })
    
     .state('app.sbrettcategory', {
      url: "/sbrett/:categoriesId",
      views: {
        'menuContent' :{
          templateUrl: "templates/sbrettcategories.html",
          controller: 'SbrettCategoryCtrl'
        }
      }
    })
     
     .state('app.sbrettcategoryitem', {
      url: "/:categories/:itemId",
      views: {
        'menuContent' :{
          templateUrl: "templates/sbrettcategoriesitem.html",
          controller: 'SbrettCategoryItemCtrl'
        }
      }
    })
    
    .state('app.wohnungsmarkt', {
      url: "/wohnungsmarkt",
      views: {
      	'menuContent': {
      		templateUrl: "templates/wohnungsmarkt.html"
      	}
      }
    });
    
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/news');
});

