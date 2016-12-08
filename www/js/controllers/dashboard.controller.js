app.controller('dashboardCtrl', ['$scope', '$rootScope', '$ionicLoading', 'APIService', '$location', 'Storage', '$state', '$ionicActionSheet', '$timeout', function ($scope, $rootScope, $ionicLoading, APIService, $location, Storage, $state, $ionicActionSheet, $timeout) {

  $scope.user = {};
  $scope.user = Storage.get(SESS_USER, true);
  $rootScope.orders.page = 1;
  $rootScope.orders.showLoadMore = false;

  /**
   * @Author Bhupendra
   * @desc Refresher function, called when on pull to refresh ,it updates the orders    *
   * @return {object} orders.list updated list
   *
   */
  var refreshList = function () {
    $rootScope.showLoading(true, 'Checking orders..');
    //$rootScope.orders initialization is done on app.js
    APIService.getOrders().then(function (data) {
      $rootScope.showLoading(false);
      $rootScope.orders.list = data;
      $scope.$broadcast('scroll.refreshComplete');

      //Reset paginations
      $rootScope.orders.showLoadMore = (data.length>=LIST_LIMIT);
      $rootScope.orders.page = 1;
    }, function () {
      $rootScope.showLoading(false);
    });

  }

  /**
   * @Author Bhupendra
   * @desc This function is used for pagination. It will trigger when user click on the "load more" button in the view
   */
  $scope.loadMore = function () {
    var page = 1;
    page = $rootScope.orders.page + 1;

    $rootScope.showLoading(true, 'Loading more..');

    APIService.getOrders(page).then(function (data) {
      $rootScope.showLoading(false);

      //check if data is available
      if (data.length > 0) {
        $rootScope.orders.page = page;
      } else {
        $rootScope.orders.showLoadMore = false; //if no data return then hide the "Load more" button
      }


      $scope.$apply(function () {
        $rootScope.orders.list = $rootScope.orders.list.concat(data);
      });
      $scope.$broadcast('scroll.infiniteScrollComplete');
    }, function () {
      $rootScope.showLoading(false);
    });

  }



  //Assign refreshList to rootScope so that parent will have access to this function
  $scope.pullRefresh = refreshList;
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

  $rootScope.orders.completed.page = 1;
  $rootScope.orders.completed.showLoadMore = false;


  /**
   * @Author Bhupendra
   * @desc Refresher function, called when on pull to refresh ,it updates the orders    *
   * @return {object} orders.list updated list
   *
   */
  var refreshList = function () {
      $rootScope.showLoading(true, 'Checking orders..');

      APIService.getCompletedOrders().then(function (list) {
        $rootScope.showLoading(false);
        $rootScope.orders.completed.list = list;
        $scope.$broadcast('scroll.refreshComplete');

        //reset pagination
        $rootScope.orders.completed.page = 1;
        $rootScope.orders.completed.showLoadMore = (list.length==LIST_LIMIT);
      }, function () {
        $rootScope.showLoading(false);
      });

    }
    /**
     * @Author Bhupendra
     * @desc This function is used for pagination. It will trigger when user click on the "load more" button in the view
     */
  $scope.loadMore = function () {
    var page = 1;
    page = $rootScope.orders.completed.page + 1;

    $rootScope.showLoading(true, 'Loading more..');

    APIService.getCompletedOrders(page).then(function (data) {
      $rootScope.showLoading(false);

      //check if data is available
      if (data.length > 0) {
        $rootScope.orders.completed.page = page;
      } else {
        $rootScope.orders.completed.showLoadMore = false; //if no data return then hide the "Load more" button
      }


      $scope.$apply(function () {
        $rootScope.orders.completed.list = $rootScope.orders.completed.list.concat(data);
      });
      $scope.$broadcast('scroll.infiniteScrollComplete');
    }, function () {
      $rootScope.showLoading(false);
    });

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
