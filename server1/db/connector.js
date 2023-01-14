const mysql      = require('mysql2');
const connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'readonly',
  password : '1@NahiPata',
  database : 'dvwa',
  port : '3306'
});
connection.connect();

module.exports= connection;