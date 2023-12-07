INSERT INTO users (name, email, password)
VALUES ('Eva Stanley', 'sebastianguerra@ymail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Louisa Meyer', 'jacksonrose@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Dominic Parks', 'victoriablackwell@outlook.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, street, city, province, country, post_code, description, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, active, thumbnail_photo_url, cover_photo_url)
VALUES (1, 'Speed lamp', '536 Namsub Highway', 'Sotboske', 'Quebec', 'Caanda', 'A2S 8V2', 'Description', 93061, 6, 4, 8, TRUE, 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg'),
(1, 'Blank corner', '651 Nami Road', 'Bohbatev', 'Alberta', 'Canada', 'G3T 8A0', 'Description', 85234, 6, 6, 7, TRUE, 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg'),
(2, 'Habit mix', '1650 Hejto Center', 'Genwezuj', 'Newfoundland And Labrador', 'Canada', 'R4E 8X3', 'Description', 46058, 0, 5, 6, TRUE, 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg');

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2023-12-20', '2023-12-23', 1, 2),
('2023-12-30', '2024-01-02', 2, 3),
('2024-12-20', '2023-12-23', 2, 1);

INSERT INTO property_reviews (property_id, reservation_id, guest_id, message, rating)
VALUES (1, 1, 2, 'Message', 3),
(2, 2, 3, 'Message', 4),
(2, 3, 1, 'Message', 4);