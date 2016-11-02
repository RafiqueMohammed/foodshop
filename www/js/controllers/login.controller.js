app.controller('loginCtrl', ['$scope', '$ionicLoading', 'APIService', 'Storage', '$ionicPopup', '$location', '$state',
    function ($scope, $ionicLoading, APIService, Storage, $ionicPopup, $location, $state) {
        $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
            User = Storage.get(SESS_USER, true);
            if (User.islogged) {
                $location.path('/dashboard');
            }
        });
        var alert = function (msg) {
            $ionicPopup.alert({
                title: "REQUIRED", template: msg
            });
        }
        var showLoading = function (show, msg) {
            if (show) {
                if (!msg) {
                    msg = 'Authenticating...';
                }
                $ionicLoading.show({
                    template: msg
                });
            } else {
                $ionicLoading.hide();
            }

        };
        $scope.user = {};
        $scope.user.username = "";
        $scope.user.password = "";

        $scope.login = function () {
            if ($scope.user.username.trim() == "") {
                alert("Enter your username");
            }
            else if ($scope.user.password == "") {
                alert("Enter your password");
            } else {


                showLoading(true);


                APIService.login({
                    username: $scope.user.username.trim(),
                    password: $scope.user.password
                }, function (success, result) {

                    showLoading(false);

                    if (success) {
                        $location.path('/dashboard');
                    } else {
                        alert(result);
                    }
                });

            }
        }

        $scope.forgotPassword = function () {
            $location.path("/reset_password");
        }


    }]);


app.controller('resetPasswordCtrl', ['$scope', '$ionicLoading', 'APIService', 'Storage', '$ionicPopup', '$location', '$state',
    function ($scope, $ionicLoading, APIService, Storage, $ionicPopup, $location, $state) {
        $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
            User = Storage.get(SESS_USER, true);
            if (User.islogged) {
                $location.path('/dashboard');
            }
        });
        $scope.email = "";
        var alert = function (msg) {
            $ionicPopup.alert({
                title: "REQUIRED", template: msg
            });
        }
        var showLoading = function (show, msg) {
            if (show) {
                if (!msg) {
                    msg = 'Please wait..';
                }
                $ionicLoading.show({
                    template: msg
                });
            } else {
                $ionicLoading.hide();
            }

        };
        $scope.gotoLogin = function () {
            $location.path("/login");
        }

        $scope.reset = function () {
            var email_regx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var email_valid = new RegExp(email_regx).test($scope.email);
            if (!email_valid) {
                alert("Invalid email address");
            } else {

                showLoading(true);


                APIService.resetPassword({
                    email: $scope.email.trim()
                }, function (success, result) {

                    showLoading(false);

                    if (success) {
                        alert(result).then(function () {
                            $location.path('/login');
                        });

                    } else {
                        alert(result);
                    }
                });

            }
        }

    }]);