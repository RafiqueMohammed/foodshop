app.controller('dashboardCtrl', ['$scope', '$rootScope', '$ionicLoading', 'APIService', '$location', 'Storage', '$state', '$ionicActionSheet', '$timeout', function ($scope, $rootScope, $ionicLoading, APIService, $location, Storage, $state, $ionicActionSheet, $timeout) {

    $scope.user = {};
    $scope.user = Storage.get(SESS_USER, true);

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

        showLoading(true);
        setTimeout(function () {
            showLoading(false);
            //$rootScope.orders initialization is done on app.js
            $rootScope.orders.list = APIService.getOrders();
            $scope.$broadcast('scroll.refreshComplete');

        }, 2000);
    }


    //make available for parent Refresh button on header
    $rootScope.doRefresh = refreshList;

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


    // $scope.orders.list = APIService.getOrders();

}]);

app.controller('orderCtrl', ['$scope', '$ionicLoading', 'APIService', '$location', '$stateParams', '$ionicPopup', '$ionicModal', '$ionicActionSheet', 'Storage',
    function ($scope, $ionicLoading, APIService, $location, $stateParams, $ionicPopup, $ionicModal, $ionicActionSheet, Storage) {

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
            $ionicPopup.alert({ template: "Marked as " + min + " minutes." }).then(function () {
                $location.path("/dashboard/order_details/" + $stateParams.order_id);
            });

        };
        $scope.confirmOrder = function () {
            $ionicPopup.show({
                title: 'ORDER READY IN',
                scope: $scope,
                buttons: [
                    {
                        text: '30 MINS',
                        type: 'button-stable',
                        onTap: function (e) {
                            setReadyTime("30");

                        }
                    },
                    {
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
                    }
                ]
            });
        };

        $scope.confirmOrder1 = function () {

            $scope.selectTime.show();

        }

        $scope.confirmReject = function () {
            var confirmPopup = $ionicPopup.confirm({
                title: 'CANCEL ORDER',
                template: 'Are you sure you want to cancel this order?'
            });

            confirmPopup.then(function (res) {
                if (res) {
                    $ionicPopup.alert({ template: 'Order has been cancelled' }).then(function () {
                        $location.path('/dashboard');
                    });
                } else {
                    console.log('You are not sure');
                }
            });
        };

        APIService.getOrder($stateParams.order_id, function (data) {
            if (data) {
                $scope.order = data;
            }
        });


    }]);
