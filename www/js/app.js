// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic']);
var User = USER_INFO;


app.run(['$ionicPlatform', '$rootScope', 'Storage', '$location', '$ionicActionSheet', '$timeout', '$state', '$ionicLoading', function ($ionicPlatform, $rootScope, Storage, $location, $ionicActionSheet, $timeout, $state, $ionicLoading) {
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
  $rootScope.StatusInfo = StatusInfo;
  $rootScope.OrderType = OrderType;

  $rootScope.orders.viewOrder = function (order) {
    if (order.order_status == ORDER_PENDING) {
      $state.go('vieworder', {
        order: JSON.stringify(order)
      });
    } else {
      // $location.path('/dashboard/order_details/' + order);
      $state.go('order_details', {
        order: JSON.stringify(order)
      });
    }

  }

  /**
   * @Author Bhupendra
   * @desc opens the actionsheet with logout and cancel button.Logout functionality handled inside it
   */
  $rootScope.showLogout = function () {

    // Show the action sheet
    var hideSheet = $ionicActionSheet.show({
      titleText: "MENU",
      buttons: [{
          text: '<i class="icon ion-log-out assertive"></i> LOGOUT'
        }, //label
      ],
      cancelText: 'Cancel',
      cancel: function () {
        // cancel functionality handled inside it
      },
      buttonClicked: function (index) {
        Storage.save(SESS_USER, USER_INFO, true); //reset the session
        $location.path('login'); //redirected to login page
        return true;
      }
    });

    // hide the actionsheet after 5 seconds
    $timeout(function () {
      hideSheet();
    }, 5000);

  };

  /**
   * @Author Bhupendra
   * @desc Shows Loading box with backdrop on the page and it is set in rootScope so that all the pages will have access to it
   */
  $rootScope.showLoading = function (show, msg) {
    if (!msg) {
      msg = 'Please wait';
    }
    if (show) {
      $ionicLoading.show({
        template: msg
      });
    } else {
      $ionicLoading.hide();
    }

  };

  $rootScope.$on('orders.order.updated', function (e, param) {
    if ($rootScope.orders.list[param.index]) {
      if ($rootScope.orders.list[param.index].order_status == ORDER_DELIVERED||$rootScope.orders.list[param.index].order_status == ORDER_REJECT) {
        $rootScope.orders.list.splice(param.index, 1);
        console.log("updateOrdersList");
      }
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
      params: {
        order: {}
      },
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
      url: '/dashboard/viewOrder',
      params: {
        order: {}
      },
      templateUrl: 'templates/orders/view_order.html',
      controller: 'orderCtrl'

    }).state('order_details', {
      url: '/dashboard/order_details',
      params: {
        order: {}
      },
      templateUrl: 'templates/orders/order_details.html',
      controller: 'orderStatusCtrl'

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

app.controller('indexCtrl', ['$scope', '$rootScope', '$state', function ($scope, $rootScope, $state) {


/**
 * @Author Bhupendra
 * @desc This function is called by Refresh button in header bar. Based on the current page the refresh will be executed
 */
  $scope.doRefresh = function () {

    if ($state.current.name == 'base.completed') {
      //Sync Completed Orders From Server
      $rootScope.refreshCompletedOrders()
    } else {
      //Sync Non-Completed Orders From Server
      $rootScope.refreshOrders()
    }
  }




}]);
