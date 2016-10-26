app.controller('dashboardCtrl', ['$scope', '$ionicLoading', 'APIService', '$location', function ($scope, $ionicLoading, APIService, $location) {
    var showLoading = function (show) {
        if (show) {
            $ionicLoading.show({
                template: 'Checking orders..'
            });
        } else {
            $ionicLoading.hide();
        }

    };
    $scope.orders = {};
    $scope.orders.list = [];
    $scope.orders.viewOrder = function (order_id) {
        $location.path('/dashboard/viewOrder/' + order_id);
    }


    if (!User.islogged) {
        $location.path('/login');
    } else {
        showLoading(true);
        setTimeout(function () {
            showLoading(false);
            $scope.orders.list = APIService.getOrders();
        }, 2000);
    }







    // $scope.orders.list = APIService.getOrders();

}]);

app.controller('orderCtrl', ['$scope', '$ionicLoading', 'APIService', '$location', '$stateParams', '$ionicPopup', '$ionicModal',
    function ($scope, $ionicLoading, APIService, $location, $stateParams, $ionicPopup, $ionicModal) {


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

        $scope.confirmOrder = function () {
            $ionicPopup.show({
                title: 'ORDER READY IN',
                scope: $scope,
                buttons: [
                    {
                        text: '30 MINS',
                        type: 'button-stable',
                        onTap: function (e) {
                            if (!$scope.data.wifi) {
                                //don't allow the user to close unless he enters wifi password
                                e.preventDefault();
                            } else {
                                return $scope.data.wifi;
                            }
                        }
                    },
                    {
                        text: '45 MINS',
                        type: 'button-stable',
                        onTap: function (e) {
                            if (!$scope.data.wifi) {
                                //don't allow the user to close unless he enters wifi password
                                e.preventDefault();
                            } else {
                                return $scope.data.wifi;
                            }
                        }
                    }, {
                        text: '60 MINS',
                        type: 'button-stable',
                        onTap: function (e) {
                            if (!$scope.data.wifi) {
                                //don't allow the user to close unless he enters wifi password
                                e.preventDefault();
                            } else {
                                return $scope.data.wifi;
                            }
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
                console.log(data);

            }
        });

        var showLoading = function (show) {
            if (show) {
                $ionicLoading.show({
                    template: 'Checking orders..'
                });
            } else {
                $ionicLoading.hide();
            }

        };
        /*showLoading(true);
            setTimeout(function(){
                showLoading(false);
                $scope.orders.list=APIService.getOrders();
            },2000);*/
    }]);
