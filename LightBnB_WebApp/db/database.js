const properties = require("./json/properties.json");
const users = require("./json/users.json");
const { Pool } = require('pg');

//Create DB connection
const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  return pool
    .query(
      `SELECT * FROM users
      WHERE email = $1`, [email])
    .then((result) => {
      // if no user exists then null
      if (result.rows.length === 0) {
        return null;
      }
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  return pool
    .query(
      `SELECT * FROM users
      WHERE id = $1`, [id])
    .then((result) => {
      // if no user exists return null
      if (result.rows.length === 0) {
        return null;
      }
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  return pool
    .query(
      `INSERT INTO users(name, email, password) VALUES($1, $2, $3) 
      RETURNING *`, [user.name, user.email, user.password])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  return pool
    .query(
      `SELECT reservations.*, properties.*, avg(property_reviews.rating) as
      average_rating FROM reservations
      JOIN properties ON reservations.property_id = properties.id
      JOIN property_reviews ON reservations.property_id = property_reviews.property_id
      WHERE reservations.guest_id = $1
      GROUP BY reservations.id, properties.id
      ORDER BY reservations.start_date LIMIT $2;`, [guest_id, limit])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err);
    });
};

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = (options, limit = 10) => {
  const queryParams = [];
  let queryString = `SELECT properties.*, AVG(property_reviews.rating) AS average_rating FROM properties
  JOIN property_reviews ON properties.id = property_reviews.property_id
  WHERE 1 = 1`;
  // Search by City
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += ` AND city LIKE $${queryParams.length}`;
  }
  // Search by Owner
  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    queryString += ` AND owner_id = $${queryParams.length}`;
  }
  // Search by minimum price
  if (options.minimum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night}`);
    queryString += ` AND cost_per_night >= $${queryParams.length}`;
  }
  // Search by maximum price
  if (options.maximum_price_per_night) {
    queryParams.push(`${options.maximum_price_per_night}`);
    queryString += ` AND cost_per_night <= $${queryParams.length}`;
  }
  // groupping properties by id
  queryString += `
  GROUP BY properties.id`;
  // Search by minimum rating
  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryString += ` HAVING AVG(property_reviews.rating) >= $${queryParams.length}`;
  }
  // adding limit value to options
  queryParams.push(limit);
  // ordering and limit
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;
  // returns query
  return pool.query(queryString, queryParams).then((res) => res.rows).catch((err) => console.log(err));
};

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  return pool
    .query(
      `INSERT INTO properties(owner_id, title, street, city, province, country, 
        post_code, description, cost_per_night, parking_spaces, number_of_bathrooms, 
        number_of_bedrooms, thumbnail_photo_url, cover_photo_url) 
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) 
      RETURNING *`, [property.owner_id, property.title, property.street, property.city, property.province, property.country,
        property.post_code, property.description, property.cost_per_night, property.parking_spaces, property.number_of_bathrooms,
        property.number_of_bedrooms, property.thumbnail_photo_url, property.cover_photo_url])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};
