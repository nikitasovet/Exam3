var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://zoo:mongoDB@ds133358.mlab.com:33358/socialzoo';

var _connection = null;

var open = function() {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log("DB connection failed");
            return;
        }
        _connection = db;
        console.log("DB connection open");
    });
};

var get = function() {
    return _connection;
};

module.exports = {
    open: open,
    get: get
};
