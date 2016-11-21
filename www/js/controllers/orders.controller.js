/** 
 * AUTHOR : Bhupendra
 * STATE : vieworder
 * PATH : /dashboard/viewOrder
 * ABOUT CONTROLLER : 
 * This controller is to view pending order. User can Accept or Reject the order in this page
 * 
 * */

app.controller('orderCtrl', ['$scope', '$rootScope', 'APIService', '$location', '$stateParams', '$state', '$ionicPopup', '$ionicModal', '$ionicActionSheet', 'Storage',
  function ($scope, $rootScope, APIService, $location, $stateParams, $state, $ionicPopup, $ionicModal, $ionicActionSheet, Storage) {



    $scope.user = {};
    $scope.user = Storage.get(SESS_USER, true);
    User = Storage.get(SESS_USER, true);

    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
      viewData.enableBack = true;
      if (!User.islogged) {
        $location.path('/login');
      }
    });

    $scope.order = {};

    $scope.confirm = {};
    $scope.confirm.time = function (val) {
      console.log("confirm ", val);
    }

    $ionicModal.fromTemplateUrl('templates/time-modal.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.selectTime = modal;
    });

    var setReadyTime = function (min) {

      $rootScope.showLoading(true, "Accepting order..");
      APIService.acceptOrder({
        id: $scope.order.id,
        status: ORDER_ACCEPT
      }, min).then(function (res) {
        $rootScope.showLoading(false);
        $scope.order.order_status = ORDER_ACCEPT;
        
        angular.forEach($rootScope.orders.list, function (value, key) {
                console.log(key + ': ' + value);
                if (value.id == order.id) {
                  $rootScope.orders.list[key] = order;
                  $rootScope.$broadcast('orders.order.updated', {
                    index: key
                  });
                  return;
                }
              });
        $state.go("order_details", {
          order: JSON.stringify($scope.order)
        });
      }).catch(function (err) {
        $rootScope.showLoading(false);
        $ionicPopup.alert({
          template: err
        });
      });
    };
    $scope.confirmOrder = function () {
      $ionicPopup.show({
        title: 'ORDER READY IN',
        scope: $scope,
        buttons: [{
          text: '30 MINS',
          type: 'button-stable',
          onTap: function (e) {
            setReadyTime("30");

          }
        }, {
          text: '45 MINS',
          type: 'button-stable',
          onTap: function (e) {
            setReadyTime("45");

          }
        }, {
          text: '60 MINS',
          type: 'button-stable',
          onTap: function (e) {
            setReadyTime("60");

          }
        }]
      });
    };



    $scope.confirmReject = function () {
      var confirmPopup = $ionicPopup.confirm({
        title: 'CANCEL ORDER',
        template: 'Are you sure you want to cancel this order?'
      });

      confirmPopup.then(function (res) {
        if (res) {
          APIService.cancelOrder({
            id: $scope.order.id,
            status: ORDER_REJECT
          }).then(function (res) {

            angular.forEach($rootScope.orders.list, function (value, key) {

              if (value.id == $scope.order.id) {
                $rootScope.orders.list.splice(key, 1);
                $ionicPopup.alert({
                  template: 'Order has been cancelled'
                }).then(function () {
                  $location.path('/dashboard');
                });

                return;
              }
            });



          }).catch(function (err) {
            $ionicPopup.alert({
              template: err
            }).then(function () {
              $location.path('/dashboard');
            });
          });
        } else {
          console.log('You are not sure');
        }
      });
    };
    $scope.order = JSON.parse($stateParams.order);

  }
]);

/** 
 * AUTHOR : Bhupendra
 * STATE : order_details
 * PATH : /dashboard/order_details
 * ABOUT CONTROLLER : 
 * This controller is for Order Summary where user can set and send notification to change order status
 * */

app.controller('orderStatusCtrl', ['$scope', '$rootScope', 'APIService', '$location', '$stateParams', '$state', '$ionicPopup', '$ionicModal', '$ionicActionSheet', 'Storage', 
  function ($scope, $rootScope, APIService, $location, $stateParams, $state, $ionicPopup, $ionicModal, $ionicActionSheet, Storage) {

    User = Storage.get(SESS_USER, true);
    $scope.order = {};
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
      viewData.enableBack = true;
      if (!User.islogged) {
        $location.path('/login');
      }

      if ($stateParams.order && $stateParams.order != "") {
        $scope.order = JSON.parse($stateParams.order);

      } else {
        $ionicPopup.alert({
          template: "Required parameters is missing. Please go back and try again"
        }).then(function () {

          $state.go("base.dashboard");
        });
      }

    });

 
$rootScope.$ionicGoBack = function() {
    $state.go("base.dashboard");
};
    
    /* NETWORK REQUEST TO GET ORDER DETAIL
        APIService.getOrder($stateParams.order_id, function (data) {
            if (data) {
                $scope.order = data;
                console.log(data,"orderCtrl called");
            }
        });*/

    $scope.setStatus = function () {
      var confirmPopup = $ionicPopup.confirm({
        title: 'CONFIRM',
        template: 'Are you sure you want to change status?'
      });

      confirmPopup.then(function (res) {
        if (res) {
          $rootScope.showLoading(true, "Changing orders status");
          APIService.setOrderStatus($scope.order).then(function (order) {

            $scope.$apply(function () {
              $scope.order = order;
              angular.forEach($rootScope.orders.list, function (value, key) {
                console.log(key + ': ' + value);
                if (value.id == order.id) {
                  $rootScope.orders.list[key] = order;
                  $rootScope.$broadcast('orders.order.updated', {
                    index: key
                  });
                  return;
                }
              });
            });
            console.log(order, "order CB");
            $rootScope.showLoading(false);
          });
        }
      });

    }

  }
]);
