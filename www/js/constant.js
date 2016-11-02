/** DEFAULTS */

var SESS_USER = "user_info";
var LOGIN_URL = "";
var USER_INFO = { id: "", ttl: 0, created: "", userId: 0, role: "", islogged: false };

/** WEB SERVICE URL */

var BASE_URL = "http://10.0.11.98:4001/api";
var LOGIN_URL = BASE_URL + "/restaurants/login";
var ORDERS_URL = BASE_URL + "/restaurants/order_items";
var RESET_PASSWORD_URL = BASE_URL + "/restaurants/reset";


/** WEB SERVICE ERROR CODE */

var ERR_LOGIN_FAILED = "LOGIN_FAILED";