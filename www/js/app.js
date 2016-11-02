// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic']);
var User = USER_INFO;


app.run(['$ionicPlatform', '$rootScope', 'Storage', '$location', '$ionicActionSheet', '$timeout', function ($ionicPlatform, $rootScope, Storage, $location, $ionicActionSheet, $timeout) {
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

   
  });

 var _u = Storage.get(SESS_USER, true);
    if (Object.keys(_u).length > 0) {
      User = _u;
    } else {
      Storage.save(SESS_USER, User, true);
    }

  //$rootScope is used to avoid ajax request on every tabclick
  //orders list initialization for dashboard,completed orders
  $rootScope.orders = {};
  $rootScope.orders.list = [];
  $rootScope.orders.completed = {};
  $rootScope.orders.completed.list = [];

  $rootScope.orders.viewOrder = function (order) {
    if (order.status == 'waiting') {
      $location.path('/dashboard/viewOrder/' + order.order_id);
    } else {
      $location.path('/dashboard/order_details/' + order.order_id);
    }

  }

  /**
 * @Author Bhupendra
 * @desc opens the actionsheet with logout and cancel button.Logout functionality handled inside it
 */
  $rootScope.showLogout = function () {

    // Show the action sheet
    var hideSheet = $ionicActionSheet.show({
      titleText:"MENU",
      buttons: [
        { text: '<i class="icon ion-log-out assertive"></i> LOGOUT' }, //label
      ],
      cancelText: 'Cancel',
      cancel: function () {
        // cancel functionality handled inside it
      },
      buttonClicked: function (index) {
        Storage.save(SESS_USER, USER_INFO, true);  //reset the session
        $location.path('login');   //redirected to login page
        return true;
      }
    });

    // hide the actionsheet after 5 seconds
    $timeout(function () {
      hideSheet();
    }, 5000);

  };

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

    })
    .state('reset_password', {
      url: '/reset_password',
      templateUrl: 'templates/reset_password.html',
      controller: 'resetPasswordCtrl'

    });



  $urlRouterProvider.otherwise('/dashboard');




}]);


