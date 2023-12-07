SELECT reservations.id, properties.title AS title, cost_per_night, start_date, AVG(rating) FROM reservations
JOIN properties ON property_id = properties.id
JOIN property_reviews ON reservations.property_id = property_reviews.property_id
WHERE reservations.guest_id = 1
GROUP BY reservations.id, properties.title, cost_per_night
ORDER BY start_date
LIMIT 10;