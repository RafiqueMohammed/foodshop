app.controller('dashboardCtrl', ['$scope', '$rootScope', '$ionicLoading', 'APIService', '$location', 'Storage', '$state', '$ionicActionSheet', '$timeout', function ($scope, $rootScope, $ionicLoading, APIService, $location, Storage, $state, $ionicActionSheet, $timeout) {
console.log($state.current,"cuurent state");
  $scope.user = {};
  $scope.user = Storage.get(SESS_USER, true);

  /**
   * @Author Bhupendra
   * @desc Refresher function, called when on pull to refresh ,it updates the orders    *
   * @return {object} orders.list updated list
   *
   */
  var refreshList = function () {
    $rootScope.showLoading(true);
    setTimeout(function () {
      $rootScope.showLoading(false);
      //$rootScope.orders initialization is done on app.js
      APIService.getOrders().then(function (data) {
       
        $rootScope.orders.list = data;
         $scope.$broadcast('scroll.refreshComplete');
      });
    }, 2000);
  }


  //Assign refreshList to rootScope so that parent will have access to this function
  $rootScope.refreshOrders = refreshList;

  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    User = Storage.get(SESS_USER, true);
    if (!User.islogged) {
      $location.path('/login');
    } else {
      //Check if list is already prefilled or empty to avoid ajax request on every tabclick
      //$rootScope.orders initialization is done on app.js
      if ($rootScope.orders.list.length == 0) {
        refreshList();
      }
    }

  });

}]);


/**
 * Controller to fetch list of all the completed orders.
 */
app.controller('completedOrdersCtrl', ['$scope', '$rootScope', '$ionicLoading', 'APIService', '$location', 'Storage', function ($scope, $rootScope, $ionicLoading, APIService, $location, Storage) {

  var showLoading = function (show) {
    if (show) {
      $ionicLoading.show({
        template: 'Checking orders..'
      });
    } else {
      $ionicLoading.hide();
    }

  };

  /**
   * @Author Bhupendra
   * @desc Refresher function, called when on pull to refresh ,it updates the orders    *
   * @return {object} orders.list updated list
   *
   */
  var refreshList = function () {
    $rootScope.showLoading(true);
    setTimeout(function () {
      $rootScope.showLoading(false);
       
      APIService.getCompletedOrders().then(function(list){
        $rootScope.orders.completed.list=list;
        $scope.$broadcast('scroll.refreshComplete');
      });
      
    }, 2000);
  }
  $scope.refreshCompletedList = refreshList;

  //Assign refreshList to rootScope so that parent will have access to this function
  $rootScope.refreshCompletedOrders = refreshList;

  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    User = Storage.get(SESS_USER, true);

    if (!User.islogged) {
      $location.path('/login');
    } else {
      //Check if list is already prefilled or empty to avoid ajax request on every tabclick
      if ($rootScope.orders.completed.list.length == 0) {
        refreshList();
      }

    }
  });

}]);
