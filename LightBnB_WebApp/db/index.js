const { Pool } = require('pg');

//Create DB connection
const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

const query = (text, params, callback) => {
  return pool.query(text, params, callback);
};

module.exports = {
  query
};