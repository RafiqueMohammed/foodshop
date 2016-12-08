app.controller('loginCtrl', ['$scope', '$ionicLoading', 'APIService', 'Storage', '$ionicPopup', '$location', '$state', '$ionicHistory',
  function ($scope, $ionicLoading, APIService, Storage, $ionicPopup, $location, $state, $ionicHistory) {
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
      User = Storage.get(SESS_USER, true);
      if (User.islogged) {
        $state.go('base.dashboard');
      }
    });
    var alert = function (msg) {
      $ionicPopup.alert({
        title: "REQUIRED",
        template: msg
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
      } else if ($scope.user.password == "") {
        alert("Enter your password");
      } else {


        showLoading(true);


        APIService.login({
          username: $scope.user.username.trim(),
          password: $scope.user.password
        }).then(function (result) {

          showLoading(false);
          $ionicHistory.nextViewOptions({
            disableBack: true
          });
          $state.go('base.dashboard');

        }, function (err) {
          showLoading(false);
          alert(err);
        });

      }
    }

    $scope.forgotPassword = function () {
     
       $state.go('reset_password');
    }


  }
]);


app.controller('resetPasswordCtrl', ['$scope', '$rootScope', '$ionicLoading', 'APIService', 'Storage', '$ionicPopup', '$location', '$state', '$ionicHistory','$timeout',
  function ($scope, $rootScope, $ionicLoading, APIService, Storage, $ionicPopup, $location, $state, $ionicHistory,$timeout) {
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {

      User = Storage.get(SESS_USER, true);
      if (User.islogged) {
        
         $state.go('base.dashboard');
      }
    });

    var _t = {
      otp: "",
      email_txt: "",
      password: "",
      verify_password: ""
    };
    $scope.step = 1;
    $scope.form = _t;




    var alert = function (msg, title) {
      if (!title) {
        title = "REQUIRED";
      }
      return $ionicPopup.alert({
        title: title,
        template: msg
      });
    }

    $scope.gotoLogin = function () {
      $scope.step = 1;
      $scope.form = _t;
      $timeout(function () {
        $ionicHistory.nextViewOptions({
          disableBack: true
        });
        
         $state.go('login');
      }, 200);

    }


    $scope.sendOTP = function () {

      var email_regx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var email_valid = new RegExp(email_regx).test($scope.form.email_txt);
      if (!email_valid) {
        alert("Invalid email address");
      } else {

        $rootScope.showLoading(true);
        APIService.sendOTP({
          email: $scope.form.email_txt.trim()
        }).then(function (result) {

          $rootScope.showLoading(false);

          alert(result, "OTP SENT").then(function () {
            $scope.step = 2;
          });
        }, function (err) {
          $rootScope.showLoading(false);
          alert(err, "ERROR");
        });

      }
    }

    $scope.verifyOTP = function () {
      if ($scope.form.otp == "") {
        alert("Please enter OTP pin");
      } else {
        //verify OTP over network

        $rootScope.showLoading(true);
        APIService.verifyOTP({
          otpToken: $scope.form.otp,
          email: $scope.form.email_txt.trim(),

        }).then(function (result) {

          $rootScope.showLoading(false);

          alert(result, "VERIFIED").then(function () {
            $scope.step = 3;
          });
        }, function (err) {
          $rootScope.showLoading(false);
          alert(err, "ERROR");
        });
      }
    }

    $scope.resetPassword = function () {
      if ($scope.form.password == "" || $scope.form.verify_password == "") {
        alert("All fields are required");
      } else {
        if ($scope.form.password != $scope.form.verify_password) {
          alert("Password didn't match. Please enter again");
        } else {

          $rootScope.showLoading(true);
          APIService.updateProfile({
            password: $scope.form.password
          }).then(function (result) {

            $rootScope.showLoading(false);

            alert(result, "SUCCESS").then(function () {
              $scope.gotoLogin();
            });
          }, function (err) {
            $rootScope.showLoading(false);
            alert(err, "ERROR");
          });
        }
      }
    }


  }
]);
