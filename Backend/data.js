var mysql = require("mysql");

var connection = mysql.createConnection({
    host: 'localhost',
    database: 'pwb',
    user:'root',
    password:'12345678'
});

module.exports = connection;
