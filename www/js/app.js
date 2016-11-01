// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic']);
var User = { fullname: "", email: "", islogged: false };


app.run(['$ionicPlatform', '$rootScope', 'Storage', function ($ionicPlatform, $rootScope, Storage) {
  $ionicPlatform.ready(function () {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }

    var _u = Storage.get(SESS_USER, true);
    if (Object.keys(_u).length > 0) {
      User = _u;
    } else {
      Storage.save(SESS_USER, User, true);
    }

  });
}])

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('base', {
      url: '',
      abstract: true,
      templateUrl: 'templates/base.html'
    })
    .state('base.dashboard', {
      url: '/dashboard',
      views: {
        'dashboard': {
          templateUrl: 'templates/dashboard.html',
          controller: 'dashboardCtrl'
        }
      }
    })
    /*.state('base.dashboard', {
        url: '/dashboard',
        views: {
          'dashboard': {
            templateUrl: 'templates/dashboard.html',
            controller: 'dashboardCtrl'
          }
        }
      })*/
    .state('base.completed', {
      url: '/completed',
      views: {
        'completed': {
          templateUrl: 'templates/completed_orders.html',
          controller: 'completedOrdersCtrl'
        }
      }
    })
    .state('vieworder', {
      url: '/dashboard/viewOrder/:order_id',
      templateUrl: 'templates/orders/view_order.html',
      controller: 'orderCtrl'

    }).state('order_details', {
      url: '/dashboard/order_details/:order_id',
      templateUrl: 'templates/orders/order_details.html',
      controller: 'orderCtrl'

    })
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'

    });

    

$urlRouterProvider.otherwise('/dashboard');


  

}]);


