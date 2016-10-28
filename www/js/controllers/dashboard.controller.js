app.controller('dashboardCtrl', ['$scope', '$rootScope', '$ionicLoading', 'APIService', '$location','Storage', '$state','$ionicActionSheet','$timeout', function ($scope, $rootScope, $ionicLoading, APIService, $location,Storage, $state,$ionicActionSheet, $timeout) {

    $scope.user = {};
    $scope.user = Storage.get(SESS_USER,true);
    User = Storage.get(SESS_USER,true);
    var showLoading = function (show) {
        if (show) {
            $ionicLoading.show({
                template: 'Checking orders..'
            });
        } else {
            $ionicLoading.hide();
        }

    };

    $rootScope.showLogout = function() {

        // Show the action sheet
        var hideSheet = $ionicActionSheet.show({
            buttons: [
                { text: 'Logout' },
            ],
            cancelText: 'Cancel',
            cancel: function() {
                // add cancel code..
            },
            buttonClicked: function(index) {
                USER = Storage.remove(SESS_USER,User);
                /*User.islogged = false;
                User.fullname = "";
                User.email = '';*/
                $state.go('login');
                return true;
            }
        });

        // For example's sake, hide the sheet after two seconds
        $timeout(function() {
            hideSheet();
        }, 2000);

    };
    $scope.orders = {};
    $scope.orders.list = [];
    $scope.orders.viewOrder = function (order) {
        if (order.status == 'waiting') {
            $location.path('/dashboard/viewOrder/' + order.order_id);
        } else {
            $location.path('/dashboard/order_details/' + order.order_id);
        }

    }

    $rootScope.doRefresh = function () {
        showLoading(true);
        setTimeout(function () {
            showLoading(false);
            $scope.orders.list = APIService.getOrders();
            $scope.$broadcast('scroll.refreshComplete');
        }, 2000);
    }

 $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    if (!User.islogged) {
        $location.path('/login');
    } else {
        showLoading(true);
        setTimeout(function () {
            showLoading(false);
            $scope.orders.list = APIService.getOrders();
        }, 2000);
    }

 });





    // $scope.orders.list = APIService.getOrders();

}]);

app.controller('orderCtrl', ['$scope', '$ionicLoading', 'APIService', '$location', '$stateParams', '$ionicPopup', '$ionicModal','$ionicActionSheet','Storage',
    function ($scope, $ionicLoading, APIService, $location, $stateParams, $ionicPopup, $ionicModal,$ionicActionSheet,Storage) {

        User = Storage.get(SESS_USER,true);
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
