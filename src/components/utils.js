var uuid = require('node-uuid');

var ouuid = function(object_name) {
    return object_name + "-" + uuid.v4();
}

var contains = function(a, obj) {
    var i = a.length;
    while (i--) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}


module.exports.ouuid = ouuid;
module.exports.contains = contains;
