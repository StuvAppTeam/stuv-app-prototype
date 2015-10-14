// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','angular.filter','starter.directives','ngIOS9UIWebViewPatch'])

.config(function($httpProvider){
    $httpProvider.interceptors.push(function($rootScope){
        return {
            request: function(config){
                $rootScope.$broadcast('loading:show')
                return config
            },
            response: function(response){
                $rootScope.$broadcast('loading:hide')
                return response
            }
        }
    })
})

.run(function($ionicPlatform, $rootScope, $ionicLoading) {
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

  $rootScope.$on('loading:show', function(){
      $ionicLoading.show({template: '<ion-spinner icon="spiral"></ion-spinner>'})
  })

  $rootScope.$on('loading:hide', function(){
      $ionicLoading.hide()
  })
})

//Konfiguration des App Routings. Für genauere Dokumentation der Funktionsweise: ui-router oder ionic-router
.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $stateProvider

//Festlegen der Route für das SideMenu
    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

//Festlegen der Route für den Mensa Speiseplan
    .state('app.mensa', {
      cache: false,
      url: "/mensa",
      views: {
        'menuContent' :{
     	  //Verlinkung des HTML Templates, welches bei dieser Route angezeigt werden soll
          templateUrl: "templates/mensa.html",
          //Angabe des Controllers, der für die gesamte angezeigte Seite verwendet wird
          controller: 'MensaCtrl'
        }
      }
    })

//Festlegen der Route für das Freizeitangebot der StuV
    .state('app.fangebot', {
      url: "/fangebot",
      views: {
        'menuContent' :{
          templateUrl: "templates/fangebot.html",
          controller: 'FangebotCtrl'
        }
      }
    })

//Festlegen der Route für einzelne Freizeitangebote
    .state('app.fangebotitem', {
    	url: '/fangebot/:fangebotId',
    	views: {
    		'menuContent': {
    			templateUrl: 'templates/fangebotitem.html',
    			controller: 'FangebotItemCtrl'
    		}
    	}
    })

//Festlegen der Route für den Event-Kalender
    .state('app.kalender', {
      url: "/kalender",
      views: {
        'menuContent' :{
          templateUrl: "templates/kalender.html",
          controller: 'KalenderCtrl'
        }
      }
    })

//Festlegen der Route für die Standort Informationen
    .state('app.campus', {
    	url: '/campus',
    	views: {
    		'menuContent': {
    			templateUrl: 'templates/campus.html',
    			controller: 'CampusCtrl'
    		}
    	}
    })

//Festlegen der Route für die einzelnen Standorte
    .state('app.campusitem', {
    	url: '/campus/:campusId',
    	views: {
    		'menuContent': {
    			templateUrl: 'templates/campusitem.html',
    			controller: 'CampusItemCtrl'
    		}
    	}
    })

//Festlegen der Route für News der StuV oder der DHBW
    .state('app.news', {
      url: "/news",
      views: {
        'menuContent' :{
          templateUrl: "templates/news.html",
          controller: 'NewsCtrl'
        }
      }
    })

//Festlegen der Route für einzelne Neuigkeiten
    .state('app.newsitem', {
      url: "/news/:newsId",
      views: {
        'menuContent' :{
          templateUrl: "templates/newsitem.html",
          controller: 'NewsItemCtrl'
        }
      }
    })

//Festlegen der Route für alle Angebote im schwarzen Brett
    .state('app.sbrett', {
    	url: "/sbrett",
    	views: {
    		'menuContent': {
    			templateUrl: "templates/sbrett.html",
    			controller: 'SbrettCtrl'
    			}
    		}
    })

//Festlegen der Route für die einzelnen Kategorien im schwarzen Brett
     .state('app.sbrettcategory', {
      url: "/sbrett/:categoriesId",
      views: {
        'menuContent' :{
          templateUrl: "templates/sbrettcategories.html",
          controller: 'SbrettCategoryCtrl'
        }
      }
    })

//Festlegen der Route für einzelne Angebote
     .state('app.sbrettcategoryitemoffer', {
      url: "/:categories/offer/:itemId",
      views: {
        'menuContent' :{
          templateUrl: "templates/sbrettcategoriesitemoffer.html",
          controller: 'SbrettCategoryItemCtrlOffer'
        }
      }
    })

//Festlegen der Route für einzelne Gesuche
     .state('app.sbrettcategoryitemrequest', {
      url: "/:categories/request/:itemId",
      views: {
        'menuContent' :{
          templateUrl: "templates/sbrettcategoriesitemrequest.html",
          controller: 'SbrettCategoryItemCtrlRequest'
        }
      }
    })

//Festlegen der Route für den Wohnungsmarkt
    .state('app.wohnungsmarkt', {
      url: "/wohnungsmarkt",
      views: {
      	'menuContent': {
      		templateUrl: "templates/wohnungsmarkt.html",
      		controller: 'WohnungCtrl'
      	}
      }
    })

//Festlegen der Route für einzelne Wohnungsangebote
    .state('app.wohnungsitemoffer', {
    	url: "/wohnungsmarkt/offerApa/:wohnungsId",
    	views: {
    		'menuContent' :{
    			templateUrl: "templates/wohnungsitemoffer.html",
    			controller: 'WohnungItemCtrlOffer'
    		}
    	}
    })

//Festlegen der Route für Wohnungsgesuche
        .state('app.wohnungsitemrequest', {
    	url: "/wohnungsmarkt/requestApa/:wohnungsId",
    	views: {
    		'menuContent' :{
    			templateUrl: "templates/wohnungsitemrequest.html",
    			controller: 'WohnungItemCtrlRequest'
    		}
    	}
    })

    .state('app.impressum', {
    	url: "/impressum",
    	views: {
    		'menuContent' :{
    			templateUrl: "templates/impressum.html"
    		}
    	}
    });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/news');
  // Tab Reiter bei Android auch unten und nicht oben
  $ionicConfigProvider.tabs.position('bottom');

  // Ausblenden des Textes im Back Button
  $ionicConfigProvider.backButton.text('').icon('ion-chevron-left').previousTitleText(false);
});
