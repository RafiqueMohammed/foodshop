app.factory('APIService', ['$http', 'Storage', function ($http, Storage) {
  var orders = [];

  /**
   * @author Bhupendra
   * @description This api web service is used to check and authenticate user's login credentials.
   * @param (Object) data which contains post parameters.
   * @return (object) response
   */

  var authenticateUser = function (data) {

    /** FOR TESTING PURPOSE
    response={};
    response.islogged = true;
    Storage.save(SESS_USER, response, true);
    callback(true, "Authentication successfull");
    return;*/

    return new Promise(function (resolve, reject) {
      $http.post(LOGIN_URL, data).then(function (response) {
        //successfully executed
        if (response.data) {
          response.data.islogged = true;
          Storage.save(SESS_USER, response.data, true);
          resolve();
        } else {
          reject("Invalid Response");
        }

      }, function (response) {
        //error on request
        if (response.data.error.code == ERR_LOGIN_FAILED) {
          reject("Username/Password is invalid");
        } else {
          reject("Server is not responding");
        }


      });
    });

  }


  var getOrders = function (page) {

    return new Promise(function (resolve, reject) {
      if (!page) {
        page = 1;
      }
      var _orders = [];
      var data = {};
      data.restaurant_id = User.userId;
      data.limit = LIST_LIMIT;
      data.page = page;
      $http.post(ORDERS_URL, data).then(function (response) {
        //successfully executed
        if (response.data) {
          console.log(response.data);
          if (response.data.length > 0) {
            _orders = response.data;
          }
        }
        resolve(_orders); //returns orders data if available or returns empty

      }, function (response) {
        resolve(_orders); //returns empty data
      });

    });

  }
  var getCompletedOrders = function (page) {

    return new Promise(function (resolve, reject) {
      if (!page) {
        page = 1;
      }
      var _orders = [];
      var data = {};
      data.restaurant_id = User.userId;
      data.limit = LIST_LIMIT;
      data.completed_order = "1";
      data.page = page;
      $http.post(ORDERS_URL, data).then(function (response) {
        //successfully executed
        if (response.data) {
          console.log(response.data);
          if (response.data.length > 0) {
            _orders = response.data;
          }
        }
        resolve(_orders); //returns orders data if available or returns empty

      }, function (response) {
        resolve(_orders); //returns empty data
      });

    });



  }


  var sendOTP = function (data) {

    return new Promise(function (resolve, reject) {
      $http.post(SEND_RESET_OTP_URL, data).then(function (response) {
        //successfully executed
        if (response.data) {
          resolve("Please check your email and verify OTP code");
        } else {
          reject("Invalid Response");
        }

      }, function (response) {
        //error on request
        if (response.data.error) {
          reject(response.data.error.message);
        } else {
          reject("Server is not responding");
        }


      });
    });

  }

var verifyOTP=function(data){
    return new Promise(function (resolve, reject) {
      $http.post(OTP_VERIFY_URL, data).then(function (response) {
        //successfully executed
        if (response.data) {
          response.data.islogged = true;
          Storage.save(SESS_USER, response.data, true);
          resolve("OTP verified successfully");
        } else {
          reject("Invalid Response");
        }

      }, function (response) {
        //error on request
        if (response.data.error) {
          reject(response.data.error.message);
        } else {
          reject("Server is not responding");
        }


      });
    });
}

var updateProfile=function(data){
    return new Promise(function (resolve, reject) {
      var _u = Storage.get(SESS_USER, true);
      $http.put(UPDATE_USER_URL+"/"+_u.userId+"?access_token="+_u.id, data).then(function (response) {
        //successfully executed
        if (response.data) {
          resolve("Password reset successful");
        } else {
          reject("Invalid Response");
        }

      }, function (response) {
        //error on request
        if (response.data.error) {
          reject(response.data.error.message);
        } else {
          reject("Server is not responding");
        }


      });
    });
}

  var acceptOrder = function (data, min) {

    var _setTime = function (data, cb, err) {
      data.duration = min;
      $http.post(ORDER_SET_TIME, data).then(function (response) {
        //successfully executed
        if (response.data) {
          cb();
        } else {
          err("Order accepted but unable to set time");
        }

      }, function (response) {
        err("Invalid response from server");

      });
    }

    return new Promise(function (resolve, reject) {

      $http.post(ORDER_STATUS, data).then(function (response) {
        //successfully executed
        if (response.data) {
          _setTime(data, resolve, reject);
        } else {
          reject("Unable to accept order. Please try again later");
        }

      }, function (response) {
        reject("Invalid response from server");

      });

    });
  }
  var cancelOrder = function (data) {
    return new Promise(function (resolve, reject) {
      $http.post(ORDER_STATUS, data).then(function (response) {
        //successfully executed
        if (response.data) {
          if (response.data.data.count == 1) {
            resolve();
          } else {
            reject("#167 Unable to cancel order. Please try again later");
          }

        } else {
          reject("#171 fUnable to cancel order. Please try again later");
        }

      }, function (response) {
        reject("Invalid response from server");

      });

    });
  }

  var setOrderStatus = function (order) {
    return new Promise(function (resolve, reject) {

      var _nextStatus = getNextStatus(order.order_status,order.dine_in);
      console.log(_nextStatus, "Next Status");
      var data = {};
      data.id = order.id;
      data.status = _nextStatus;

      $http.post(ORDER_STATUS, data).then(function (response) {
        if (response.data) {
          order.order_status = _nextStatus;
          resolve(order);
        } else {
          reject("Unable to set status. Please try again");
        }

      }, function (response) {
        reject("Invalid response from server");

      });

    });
  }

  return {
    getOrders: getOrders,

    getOrder: function (order_id, callback) {

      angular.forEach(orders.concat(compelted_orders), function (v, k) {
        if (order_id == v.order_id) {
          callback(v);

        }


      });

    },
    getCompletedOrders: getCompletedOrders,
    login: authenticateUser,
    sendOTP: sendOTP,
    verifyOTP:verifyOTP,
    updateProfile: updateProfile,
    acceptOrder: acceptOrder,
    cancelOrder: cancelOrder,
    setOrderStatus: setOrderStatus
  };

}]);
