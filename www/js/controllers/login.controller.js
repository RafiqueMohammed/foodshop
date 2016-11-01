app.controller('loginCtrl', ['$scope', '$ionicLoading', 'APIService', 'Storage', '$ionicPopup', '$location',
    function ($scope, $ionicLoading, APIService, Storage, $ionicPopup, $location) {
        $scope.$on('$ionicView.beforeEnter', function (event, viewData) {

            if (User.islogged) {
                $location.path('/dashboard');
            }
        });
        var alert = function (msg) {
            $ionicPopup.alert({
                title: "REQUIRED", template: msg
            });
        }
        var showLoading = function (show,msg) {
            if (show) {
                if(!msg){
msg='Authenticating..';
                }
                $ionicLoading.show({
                    template: msg
                });
            } else {
                $ionicLoading.hide();
            }

        };
        $scope.user = {};
        $scope.user.email = "";
        $scope.user.password = "";

        $scope.login = function () {
    var email_regx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var email_valid=new RegExp(email_regx).test($scope.user.email);
            if (!email_valid) {
                alert("Enter your email address");
            } else if ($scope.user.password.trim() == "") {
                alert("Enter your password");
            } else {


                showLoading(true);
                setTimeout(function () {
                    showLoading(false);

                    /** SET USER SESSION */
                    User.fullname = "Staff Will";
                    User.email = $scope.user.email;
                    User.islogged = true;
                    Storage.save(SESS_USER, User, true);
                    $location.path('/dashboard');
                }, 2000);
            }
        }



    }]);