const mysql      = require('mysql2');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'readonly',
  password : '1@NahiPata',
  database : 'dvwa'
});
connection.connect();

module.exports= connection;