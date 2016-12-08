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
var LIST_LIMIT = "25";
/** WEB SERVICE URL */

var IS_LIVE = false;
var BASE_URL = (IS_LIVE) ? "http://180.149.245.182:3003/api" : "http://10.0.11.98:4001/api";
var LOGIN_URL = BASE_URL + "/restaurants/login";
var ORDERS_URL = BASE_URL + "/app_user_orders/get-order-placed";
var ORDER_STATUS = BASE_URL + "/app_user_orders/setStatus";
var ORDER_SET_TIME = BASE_URL + "/app_user_orders/setTime";
var SEND_RESET_OTP_URL = BASE_URL + "/restaurants/generateOtp";
var OTP_VERIFY_URL = BASE_URL + "/restaurants/verifyOtp";
var UPDATE_USER_URL = BASE_URL + "/restaurants"; // /restaurants/{id}


/** WEB SERVICE ERROR CODE */

var ERR_LOGIN_FAILED = "LOGIN_FAILED";


var ORDER_PENDING = "PE";
var ORDER_ACCEPT = "R";
var ORDER_REJECT = "RE";
var ORDER_IN_PROCESS = "P";
var ORDER_DISPATCH = "DI";
var ORDER_DELIVERED = "DE";

/** TO MAKE IT SIMPLE AT VIEW, SET STATUS AND ITS TEXT,IMG */

var StatusInfo = {
  hd: {},
  di: {},
  pu: {}
};

//Home Delivery
StatusInfo.hd.PE = {
  label: "New Order"
};
StatusInfo.hd.R = {
  label: "Order Received"
};
StatusInfo.hd.P = {
  label: "In Process"
};
StatusInfo.hd.DI = {
  label: "Dispatched"
};
StatusInfo.hd.DE = {
  label: "Delivered"
};

//Pick up
StatusInfo.pu.PE = {
  label: "New Order"
};
StatusInfo.pu.R = {
  label: "Order Received"
};
StatusInfo.pu.P = {
  label: "In Process"
};
StatusInfo.pu.RP = {
  label: "Ready to pick"
};
StatusInfo.pu.DE = {
  label: "Picked"
};

//Dinin
StatusInfo.di.PE = {
  label: "New Order"
};
StatusInfo.di.R = {
  label: "Booking Received"
};
StatusInfo.di.BO = { //Order Booked
  label: "Reserved"
};StatusInfo.di.DE = { //Order Booked
  label: "Completed"
};



var OrderType =[];
 OrderType[1]={label:"Dining",code:"di"};
  OrderType[2]={label:"Pickup",code:"pu"};
  OrderType[3]={label:"Home Delivery",code:"hd"}; //order by index 1,2,3 is dine_in(web service)

var getNextStatus = function (_prevStatus, type) {
  var _s = {};
  if (type == '1') //dinin type
  {
    _s = {
      PE: "R",
      R: "BO",
      BO: "DE",
      DE: "DE"
    }
  } else if (type == '2') //Pickup type
  {
    _s = {
      PE: "R",
      R: "P",
      P: "RP",
      RP: "DE",
      DE: "DE"
    }
  } else //Home Delivery type
  {
    _s = {
      PE: "R",
      R: "P",
      P: "DI",
      DI: "DE",
      DE: "DE"
    }
  }


  return _s[_prevStatus];
}
