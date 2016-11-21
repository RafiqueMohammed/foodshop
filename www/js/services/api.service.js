app.factory('APIService', ['$http', 'Storage', function ($http, Storage) {
  var orders = [];

  /**
   * @author Bhupendra
   * @description This api web service is used to check and authenticate user's login credentials.
   * @param (Object) data which contains post parameters.
   * @return (object) response
   */

  var authenticateUser = function (data, callback) {

    /** FOR TESTING PURPOSE 
    response={};
    response.islogged = true;
    Storage.save(SESS_USER, response, true);
    callback(true, "Authentication successfull");
    return;*/

    $http.post(LOGIN_URL, data).then(function (response) {
      //successfully executed
      if (response.data) {
        response.data.islogged = true;
        Storage.save(SESS_USER, response.data, true);
        callback(true, "Authentication successfull");
      } else {
        callback(false, "Invalid Response");
      }

    }, function (response) {
      //error on request
      if (response.data.error.code == ERR_LOGIN_FAILED) {
        callback(false, "Username/Password is invalid");
      } else {
        callback(false, "Server is not responding");
      }


    });
  }


  var getOrders = function (page) {

    return new Promise(function (resolve, reject) {
      if (!page) {
        page = 1;
      }
      var _orders = [];
      if (User.islogged) {
        var data = {};
        data.restaurant_id = User.userId;
        data.access_token = User.id;
        data.limit = 20;
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
      } else {
        resolve(_orders);
      }
    });



  }
  var getCompletedOrders = function (page) {

    return new Promise(function (resolve, reject) {
      if (!page) {
        page = 1;
      }
      var _orders = [];
      if (User.islogged) {
        var data = {};
        data.restaurant_id = User.userId;
        data.access_token = User.id;
        data.limit = 20;
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
      } else {
        resolve(_orders);
      }
    });



  }


  var resetPassword = function (data, callback) {

    $http.post(RESET_PASSWORD_URL, data).then(function (response) {
      //successfully executed
      if (response.data) {
        callback(true, "Reset successfull");
      } else {
        callback(false, "Invalid Response");
      }

    }, function (response) {
      //error on request
      if (response.data.error) {
        callback(false, response.data.error.message);
      } else {
        callback(false, "Server is not responding");
      }


    });
  }

  var acceptOrder = function (data, min) {
    return new Promise(function (resolve, reject) {
      if (User.islogged) {
        data.access_token = User.id;
        $http.post(ORDER_STATUS, data).then(function (response) {
          //successfully executed
          if (response.data) {
            resolve();
          } else {
            reject("Unable to accept order. Please try again later");
          }

        }, function (response) {
          reject("Invalid response from server");

        });
      } else {
        reject("Login required");
      }
    });
  }
  var cancelOrder = function (data) {
    return new Promise(function (resolve, reject) {
      if (User.islogged) {
        data.access_token = User.id;
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
      } else {
        reject("Login required");
      }
    });
  }

  var setOrderStatus = function (order) {
    return new Promise(function (resolve, reject) {
      if (User.islogged) {
        var _nextStatus = getNextStatus(order.order_status);
        console.log(_nextStatus, "Next Status");

        var data = {};
        data.access_token = User.id;
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
      } else {
        reject("Login required");
      }
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
    resetPassword: resetPassword,
    acceptOrder: acceptOrder,
    cancelOrder: cancelOrder,
    setOrderStatus: setOrderStatus
  };

}]);
