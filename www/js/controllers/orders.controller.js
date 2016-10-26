app.controller('completedOrdersCtrl', ['$scope', '$ionicLoading', 'APIService', '$location', function ($scope, $ionicLoading, APIService, $location) {
 $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    if (!User.islogged) {
        $location.path('/login');
    }
 });

 
    $scope.orders = {};
    $scope.orders.list = [];
    $scope.orders.viewOrder = function (order_id) {
        $location.path('/dashboard/viewOrder/' + order_id);
    }

    var showLoading = function (show) {
        if (show) {
            $ionicLoading.show({
                template: 'Checking orders..'
            });
        } else {
            $ionicLoading.hide();
        }

    };


   // $scope.orders.list = APIService.getOrders();
    showLoading(true);
        setTimeout(function(){
            showLoading(false);
            $scope.orders.list=APIService.getCompletedOrders();
        },2000);
}]);