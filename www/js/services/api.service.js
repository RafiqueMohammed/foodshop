app.factory('APIService', ['$http','Storage', function ($http,Storage) {
    var orders = [];
    orders.push({
        order_id: 2354, fullname: "Customer 1", address: "66, 5th Floor, Park Avenue, Seawoods, Nerul", status: "waiting", total_amount: "645", items: [
            { itemname: "Chicken Tandoori", amount: "450", qty: "1", comment: "little spicy" },
            { itemname: "Coco cola", amount: "55", qty: "2", comment: "should be cold" },
            { itemname: "Briyani", amount: "140", qty: "8", comment: "" }
        ]
    });
    orders.push({
        order_id: 21234, fullname: "Customer 5", address: "66, 5th Floor, Park Avenue, Seawoods, Nerul", status: "inprocess", total_amount: "305", items: [
            { itemname: "Large Pizza", amount: "250", qty: "1", comment: "cheeze toppings" },
            { itemname: "Coco cola", amount: "55", qty: "2", comment: "should be cold" }
        ]
    });
    orders.push({
        order_id: 3343, fullname: "Customer 2", address: "66, 5th Floor, Park Avenue, Seawoods, Nerul", status: "readyfordispatch", total_amount: "895", items: [
            { itemname: "Large Pizza", amount: "250", qty: "1", comment: "cheeze toppings" },
            { itemname: "Chicken Tandoori", amount: "450", qty: "1", comment: "" },
            { itemname: "Coco cola", amount: "55", qty: "2", comment: "should be cold" },
            { itemname: "Briyani", amount: "140", qty: "8", comment: "" }
        ]
    });
    orders.push({
        order_id: 4637, fullname: "Customer 3", address: "66, 5th Floor, Park Avenue, Seawoods, Nerul", status: "waiting", total_amount: "305", items: [
            { itemname: "Chicken mughalai", amount: "250", qty: "1", comment: "" },
            { itemname: "Coco cola", amount: "55", qty: "2", comment: "should be cold" }
        ]
    });
    orders.push({
        order_id: 53245, fullname: "Customer 4", address: "66, 5th Floor, Park Avenue, Seawoods, Nerul", status: "delivered", total_amount: "895", items: [
            { itemname: "Large Pizza", amount: "250", qty: "1", comment: "cheeze toppings" },
            { itemname: "Chicken Tandoori", amount: "450", qty: "1", comment: "" },
            { itemname: "Coco cola", amount: "55", qty: "2", comment: "should be cold" },
            { itemname: "Briyani", amount: "140", qty: "8", comment: "" }
        ]
    });
    orders.push({
        order_id: 62354, fullname: "Customer 1", address: "66, 5th Floor, Park Avenue, Seawoods, Nerul", status: "inprocess", total_amount: "645", items: [
            { itemname: "Chicken Tandoori", amount: "450", qty: "1", comment: "" },
            { itemname: "Coco cola", amount: "55", qty: "2", comment: "should be cold" },
            { itemname: "Briyani", amount: "140", qty: "8", comment: "" }
        ]
    });
    orders.push({
        order_id: 73245, fullname: "Customer 5", address: "66, 5th Floor, Park Avenue, Seawoods, Nerul", status: "inprocess", total_amount: "305", items: [
            { itemname: "Large Pizza", amount: "250", qty: "1", comment: "cheeze toppings" },
            { itemname: "Coco cola", amount: "55", qty: "2", comment: "should be cold" }
        ]
    });
    orders.push({
        order_id: 8245, fullname: "Customer 2", address: "66, 5th Floor, Park Avenue, Seawoods, Nerul", status: "waiting", total_amount: "895", items: [
            { itemname: "Large Pizza", amount: "250", qty: "1", comment: "cheeze toppings" },
            { itemname: "Chicken Tandoori", amount: "450", qty: "1", comment: "" },
            { itemname: "Coco cola", amount: "55", qty: "2", comment: "should be cold" },
            { itemname: "Briyani", amount: "140", qty: "8", comment: "" }
        ]
    });
    orders.push({
        order_id: 9245, fullname: "Customer 3", address: "66, 5th Floor, Park Avenue, Seawoods, Nerul", status: "waiting", total_amount: "300", items: [
            { itemname: "Chicken mughalai", amount: "250", qty: "1", comment: "" },
            { itemname: "Coco cola", amount: "50", qty: "2", comment: "" }
        ]
    });
    orders.push({
        order_id: 10353, fullname: "Customer 4", address: "66, 5th Floor, Park Avenue, Seawoods, Nerul", status: "waiting", total_amount: "55", items: [
            { itemname: "Coco cola", amount: "55", qty: "2", comment: "" }
        ]
    });


    var compelted_orders = [];
    compelted_orders.push({
        order_id: 2354, fullname: "Customer 1", address: "66, 5th Floor, Park Avenue, Seawoods, Nerul", status: "delivered", total_amount: "645", items: [
            { itemname: "Chicken Tandoori", amount: "450", qty: "1", comment: "little spicy" },
            { itemname: "Coco cola", amount: "55", qty: "2", comment: "should be cold" },
            { itemname: "Briyani", amount: "140", qty: "8", comment: "" }
        ]
    });
    compelted_orders.push({
        order_id: 21234, fullname: "Customer 5", address: "66, 5th Floor, Park Avenue, Seawoods, Nerul", status: "delivered", total_amount: "305", items: [
            { itemname: "Large Pizza", amount: "250", qty: "1", comment: "cheeze toppings" },
            { itemname: "Coco cola", amount: "55", qty: "2", comment: "should be cold" }
        ]
    });
    compelted_orders.push({
        order_id: 3343, fullname: "Customer 2", address: "66, 5th Floor, Park Avenue, Seawoods, Nerul", status: "pickedup", total_amount: "895", items: [
            { itemname: "Large Pizza", amount: "250", qty: "1", comment: "cheeze toppings" },
            { itemname: "Chicken Tandoori", amount: "450", qty: "1", comment: "" },
            { itemname: "Coco cola", amount: "55", qty: "2", comment: "should be cold" },
            { itemname: "Briyani", amount: "140", qty: "8", comment: "" }
        ]
    });
    compelted_orders.push({
        order_id: 4637, fullname: "Customer 3", address: "66, 5th Floor, Park Avenue, Seawoods, Nerul", status: "delivered", total_amount: "305", items: [
            { itemname: "Chicken mughalai", amount: "250", qty: "1", comment: "" },
            { itemname: "Coco cola", amount: "55", qty: "2", comment: "should be cold" }
        ]
    });



    /**
     * @author Bhupendra
     * @description This api web service is used to check and authenticate user's login credentials.
     * @param (Object) data which contains post parameters.
     * @return (object) response
     */

    var authenticateUser = function (data, callback) {

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

var resetPassword=function (data, callback) {

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


    return {
        getOrders: function () {
            return orders;
        },
        getOrder: function (order_id, callback) {

            angular.forEach(orders, function (v, k) {
                if (order_id == v.order_id) {
                    callback(v);

                }


            });

        },
        getCompletedOrders: function () {
            return compelted_orders;
        },
        login: authenticateUser,
        resetPassword: resetPassword
    };

}]);