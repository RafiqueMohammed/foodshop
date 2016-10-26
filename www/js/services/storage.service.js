app.factory('Storage', function () {
    var _storage = localStorage;

    return {
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
        save: function (index, data, jsonString) {
            if (jsonString) {
                data = JSON.stringify(data);
            }
            return localStorage.setItem(index, data);
        }
    }
});