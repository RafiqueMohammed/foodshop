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
        showLoading(true);
        setTimeout(function () {
            showLoading(false);
            $rootScope.orders.completed.list = APIService.getCompletedOrders();
            $scope.$broadcast('scroll.refreshComplete');
        }, 2000);
    }
    $scope.refreshCompletedList = refreshList;



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