/**
 * @Author Bhupendra
 * @desc Storage factory service which contains all the session maintenance of user using localStorage
 */
app.factory('Storage', function () {
    var _storage = localStorage;

    return {
        /**
         * @Author Bhupendra
         * @desc Storage factory service which contains all the session maintenance of user using localStorage
         * @param  {string} index : key of localstorage set
         * @param  {boolean} parseJson
         * @return {object} returns the user object
         */
        get: function (index, parseJson) {
            var _d = _storage.getItem(index);
            if (!_d) {
                return "";
            } else {
                if (parseJson) {
                    _d = JSON.parse(_d);
                }
                return _d;
            }

        },
        /**
         * @Author Bhupendra
         * @desc Saves the session for user object using localStorage
         * @param  {string} index : key of localstorage to be set
         * @param  {object} user object with email,name and islogged status
         * @param  {boolean} parseJson
         */
        save: function (index, data, jsonString) {
            if (jsonString) {
                data = JSON.stringify(data);
            }
            return localStorage.setItem(index, data);
        },
        /**
         * @Author Bhupendra
         * @desc Destroys the session
         * @param  {string} index : key of localstorage  set
         * @param  {object} user object with email,name and islogged status
         * @return  {boolean}
         */
        remove: function (index,User) {

            localStorage.removeItem(index);
            User.islogged = false;
            User.fullname = "";
            User.email = '';
            return true;
        }

    }
});