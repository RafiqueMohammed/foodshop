/** DEFAULTS */

var SESS_USER = "user_info";
var LOGIN_URL = "";
var USER_INFO = {
  id: "",
  ttl: 0,
  created: "",
  userId: 0,
  role: "",
  islogged: false
};

/** WEB SERVICE URL */

var BASE_URL = "http://10.0.11.98:4001/api";
var LOGIN_URL = BASE_URL + "/restaurants/login";
var ORDERS_URL = BASE_URL + "/app_user_orders/get-order-placed";
var ORDER_STATUS = BASE_URL + "/app_user_orders/setStatus";
var ORDER_SET_TIME = BASE_URL + "/app_user_orders/setTime";
var RESET_PASSWORD_URL = BASE_URL + "/restaurants/reset";


/** WEB SERVICE ERROR CODE */

var ERR_LOGIN_FAILED = "LOGIN_FAILED";


var ORDER_PENDING = "Pe";
var ORDER_ACCEPT = "R";
var ORDER_REJECT = "Re";
var ORDER_IN_PROCESS = "P";
var ORDER_DISPATCH = "Di";
var ORDER_DELIVERED = "De";

/** TO MAKE IT SIMPLE AT VIEW, SET STATUS AND ITS TEXT,IMG */

var StatusInfo = {};

StatusInfo.Pe = {
  label: "New Request",
  imgs: ['img/order/confirmed.png', 'img/order/cook_wait.png', 'img/order/out_of_delivery_wait.png', 'img/order/delivery_wait.png']
};
StatusInfo.R = {
  label: "Order Received",
  imgs: ['img/order/confirmed.png', 'img/order/cook_wait.png', 'img/order/out_of_delivery_wait.png', 'img/order/delivery_wait.png']
};
StatusInfo.P = {
  label: "In Process",
  imgs: ['img/order/confirmed.png', 'img/order/cook_progress.png', 'img/order/out_of_delivery_wait.png', 'img/order/delivery_wait.png']
};
StatusInfo.Di = {
  label: "Dispatched",
  imgs: ['img/order/confirmed.png', 'img/order/cooked.png', 'img/order/out_for_delivery.png', 'img/order/delivery_wait.png']
};
StatusInfo.De = {
  label: "Delivered",
  imgs: ['img/order/confirmed.png', 'img/order/cooked.png', 'img/order/out_for_delivery.png', 'img/order/delivered.png']
};


var OrderType = ["Dining", "Pickup", "Home Delivery"]; //order by index 0,1,2, where index-1=order_type(web service)

var getNextStatus = function (_prevStatus) {

  var _s = {
    Pe: "R",
    R: "P",
    P: "Di",
    Di: "De",
    De: "De"
  }

  return _s[_prevStatus];
}
