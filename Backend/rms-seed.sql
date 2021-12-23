INSERT INTO users(username, password, first_name, last_name, email, is_admin)
VALUES (
    'testuser', 
    '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q', 
    'Test', 
    'User', 
    'okieDokie@Artichoky.com', 
    FALSE
    ), 
    (
    'testAdmin', 
    '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q', 
    'Test', 
    'Admin', 
    'joeNotExotic@CarolBaskin.com', 
    'true'
    );

INSERT INTO categories (category_name)
VALUES 
    ('food'), 
    ('alcohol'), 
    ('beer'), 
    ('NABev');

INSERT INTO suppliers (name, address, phone, email)
VALUES (
    'Sysco', 
    '123 Sysco Way', 
    5554512344, 
    'sysco@sysco.com'
), (
    'Markstein', 
    '150 Main St.', 
     1235952349, 
    'markstein@markstein.net'
), (
    'Coca Cola',
    '600 Cola Way', 
     5053004049, 
    'fizzy@coke.com' 
),
   (
    'Shamrock',
    '123 Main Street', 
     5043530404, 
    'green@shamrock.com' 
),
   (
    'Southern Glazers',
    '3495 Genessee Ave', 
     9594852604, 
    'green@shamrock.com' 
),
   (
    'Napoli Farms',
    '3714 Dwight st', 
     6198406277, 
    'greg@napolifarms.com' 
);

INSERT INTO products (name, unit, price, qty_per_unit, supplier_id, category_id)
VALUES 
('Buns', 'case', 50, 12.50, 1, 1),
('Fried Chicken Patties', 'case', 50, 50, 1, 1),
('Iceberg Lettuce', 'head', 1, 2, 1, 1),
('Pepper Jack Cheese', 'case', 100, 500, 1, 1),
('American Cheese', 'case', 100, 500, 1, 1),
('Budweiser', 'keg', 120, 1, 2, 3),
('Elysian Space Dust', 'keg', 215, 1, 2, 3),
('Jack Daniels', 'liter', 35, 1, 2, 2),
('Tanqueray', 'liter', 45, 1, 2, 2),
('Titos', 'liter', 25, 1, 2, 2),
('Captain Morgans', 'liter', 30, 1, 2, 2),
('Jose Cuervo', 'liter', 20, 1, 2, 2),
('Chicken Wings', 'lbs', 125, 50, 1, 1),
('Coca Cola', 'bib', 65, 1, 3, 4), 
('Sprite', 'bib', 65, 1, 3, 4),
('Dr.Pepper', 'bib', 65, 1, 3, 4),
('Barqs Rootbeer', 'bib', 65, 1, 3, 4),
('Bacon', 'case', 65, 100, 1, 1),
('Ground Beef Chuck', 'lbs', 75, 50, 1, 1 ), 
('Salmon - farm raised', 'lbs', 125,  25, 4, 1),
('Mayonnaise', 'gal', 10.99, 1, 4, 1),
('Ranch Dressing', 'gal', 15,  1, 4, 1),
('Chocolate Cookies', 'case', 29.50, 50, 4, 1),
('Grilled Chicken Breast', 'case', 45, 50, 4, 1),
('Nacho Cheese Sauce', 'case', 59, 50, 4, 1),
('Chipotle Dressing', 'gal', 15, 50, 4, 1),
('Buffalo Trace', 'liter', 55, 1, 5, 2),
('Absolute Citron', 'liter', 30, 1, 5, 2),
('Kahlua', 'liter', 27, 1, 5, 2),
('Chambord', 'liter', 32, 1, 5, 2),
('Krista Vodka', 'liter', 8, 1, 5, 2),
('Glenlivet', 'liter', 58, 1, 5, 2),
('Tomatoes', 'case', 22, 20, 6, 1),
('Romaine-chopped', 'bags', 32, 8, 6, 1),
('Jalapenos', 'lbs', 28, 10, 6, 1),
('Oranges', 'lbs', 20, 20, 6, 1);

INSERT INTO sales (date, category_id, sales)
VALUES 

('2021-11-09', 1, 5000), 
('2021-11-09', 2, 2000), 
('2021-11-09', 3, 2000), 
('2021-11-09', 4, 2000), 
('2021-11-08', 1, 5000), 
('2021-11-08', 2, 2000), 
('2021-11-08', 3, 2000), 
('2021-11-08', 4, 2000), 
('2021-11-07', 1, 5000), 
('2021-11-07', 2, 2000), 
('2021-11-07', 3, 2000), 
('2021-11-07', 4, 2000), 
('2021-12-13', 1, 3000), 
('2021-12-13', 2, 450), 
('2021-12-13', 3, 450), 
('2021-12-13', 4, 150), 
('2021-12-12', 1, 5000), 
('2021-12-12', 2, 750), 
('2021-12-12', 3, 850), 
('2021-12-12', 4, 259), 
('2021-12-11', 1, 8500), 
('2021-12-11', 2, 1108), 
('2021-12-11', 3, 1250), 
('2021-12-11', 4, 359), 
('2021-12-10', 1, 6500), 
('2021-12-10', 2, 952), 
('2021-12-10', 3, 1258), 
('2021-12-10', 4, 269), 
('2021-12-09', 1, 5500), 
('2021-12-09', 2, 790), 
('2021-12-09', 3, 859), 
('2021-12-09', 4, 266), 
('2021-12-08', 1, 4750), 
('2021-12-08', 2, 569), 
('2021-12-08', 3, 694), 
('2021-12-08', 4, 250), 
('2021-12-08', 1, 4000), 
('2021-12-08', 2, 651), 
('2021-12-08', 3, 487), 
('2021-12-08', 4, 210), 
('2021-12-07', 1, 3000), 
('2021-12-07', 2, 450), 
('2021-12-07', 3, 450), 
('2021-12-07', 4, 150), 
('2021-12-06', 1, 5000), 
('2021-12-06', 2, 750), 
('2021-12-06', 3, 850), 
('2021-12-06', 4, 259), 
('2021-12-05', 1, 8500), 
('2021-12-05', 2, 1108), 
('2021-12-05', 3, 1250), 
('2021-12-05', 4, 359), 
('2021-12-04', 1, 6500), 
('2021-12-04', 2, 952), 
('2021-12-04', 3, 1258), 
('2021-12-04', 4, 269), 
('2021-12-03', 1, 5500), 
('2021-12-03', 2, 790), 
('2021-12-03', 3, 859), 
('2021-12-03', 4, 266), 
('2021-12-02', 1, 4750), 
('2021-12-02', 2, 569), 
('2021-12-02', 3, 694), 
('2021-12-02', 4, 250), 
('2021-12-01', 1, 4000), 
('2021-12-01', 2, 651), 
('2021-12-01', 3, 487), 
('2021-12-01', 4, 210),
('2021-12-14', 1, 3000), 
('2021-12-14', 2, 450), 
('2021-12-14', 3, 450), 
('2021-12-14', 4, 150), 
('2021-12-15', 2, 750), 
('2021-12-15', 1, 5000), 
('2021-12-15', 3, 850), 
('2021-12-15', 4, 259), 
('2021-12-16', 1, 8500), 
('2021-12-16', 2, 1108), 
('2021-12-16', 3, 1250), 
('2021-12-16', 4, 359), 
('2021-12-17', 1, 6500), 
('2021-12-17', 2, 952), 
('2021-12-17', 3, 1258), 
('2021-12-17', 4, 269), 
('2021-12-18', 1, 5500), 
('2021-12-18', 2, 790), 
('2021-12-18', 3, 859), 
('2021-12-18', 4, 266), 
('2021-12-19', 1, 4750), 
('2021-12-19', 2, 569), 
('2021-12-19', 3, 694), 
('2021-12-19', 4, 250), 
('2021-12-20', 1, 4000), 
('2021-12-20', 2, 651), 
('2021-12-20', 3, 487), 
('2021-12-20', 4, 210),
('2021-12-21', 1, 3000), 
('2021-12-21', 2, 450), 
('2021-12-21', 3, 450), 
('2021-12-21', 4, 150), 
('2021-12-22', 2, 750), 
('2021-12-22', 1, 5000), 
('2021-12-22', 3, 850), 
('2021-12-22', 4, 259), 
('2021-12-23', 1, 8500), 
('2021-12-23', 2, 1108), 
('2021-12-23', 3, 1250), 
('2021-12-23', 4, 359), 
('2021-12-24', 1, 6500), 
('2021-12-24', 2, 952), 
('2021-12-24', 3, 1258), 
('2021-12-24', 4, 269), 
('2021-12-25', 1, 5500), 
('2021-12-25', 2, 790), 
('2021-12-25', 3, 859), 
('2021-12-25', 4, 266), 
('2021-12-26', 1, 4750), 
('2021-12-26', 2, 569), 
('2021-12-26', 3, 694), 
('2021-12-26', 4, 250), 
('2021-12-27', 1, 4000), 
('2021-12-27', 2, 651), 
('2021-12-27', 3, 487), 
('2021-12-27', 4, 210),
('2021-12-28', 1, 3000), 
('2021-12-28', 2, 450), 
('2021-12-28', 3, 450), 
('2021-12-28', 4, 150), 
('2021-12-29', 2, 750), 
('2021-12-29', 1, 5000), 
('2021-12-29', 3, 850), 
('2021-12-29', 4, 259), 
('2021-12-30', 1, 8500), 
('2021-12-30', 2, 1108), 
('2021-12-30', 3, 1250), 
('2021-12-30', 4, 359), 
('2021-12-31', 1, 6500), 
('2021-12-31', 2, 952), 
('2021-12-31', 3, 1258), 
('2021-12-31', 4, 269), 
('2022-01-01', 1, 5500), 
('2022-01-01', 2, 790), 
('2022-01-01', 3, 859), 
('2022-01-01', 4, 266), 
('2022-01-02', 1, 4750), 
('2022-01-02', 2, 569), 
('2022-01-02', 3, 694), 
('2022-01-02', 4, 250), 
('2022-01-03', 1, 4000), 
('2022-01-03', 2, 651), 
('2022-01-03', 3, 487), 
('2022-01-03', 4, 210),
('2022-01-04', 1, 3000), 
('2022-01-04', 2, 450), 
('2022-01-04', 3, 450), 
('2022-01-04', 4, 150), 
('2022-01-05', 2, 750), 
('2022-01-05', 1, 5000), 
('2022-01-05', 3, 850), 
('2022-01-05', 4, 259), 
('2022-01-06', 1, 8500), 
('2022-01-06', 2, 1108), 
('2022-01-06', 3, 1250), 
('2022-01-06', 4, 359), 
('2022-01-07', 1, 6500), 
('2022-01-07', 2, 952), 
('2022-01-07', 3, 1258), 
('2022-01-07', 4, 269), 
('2022-01-08', 1, 5500), 
('2022-01-08', 2, 790), 
('2022-01-08', 3, 859), 
('2022-01-08', 4, 266), 
('2022-01-09', 1, 4750), 
('2022-01-09', 2, 569), 
('2022-01-09', 3, 694), 
('2022-01-09', 4, 250), 
('2022-01-10', 1, 4000), 
('2022-01-10', 2, 651), 
('2022-01-10', 3, 487), 
('2022-01-10', 4, 210);


INSERT INTO menu_items (name, category_id, price)
VALUES 
('Buffalo Chicken Sandwich', 1, 14.99), 
('Double Cheeseburger', 1, 15.99), 
('Chicken Wings', 1, 12.99), 
('Sprite', 4, 3.99), 
('Coca Cola', 4, 3.99),
('Jack Daniels', 2, 7.99), 
('Tanqueray', 2, 7.99),
('Budweiser', 3, 7.99), 
('Elysian Space Dust', 3, 9.99);


INSERT INTO menu_item_ingredients (menu_item_id, product_id, quantity)
VALUES
(1, 1, 0.02), 
(1, 2, 0.02),
(1, 3, 0.02), 
(1, 4, 0.02), 
(2, 3, 0.02),
(2, 5, 0.02),
(2, 17, 0.02),
(2, 16, 0.02),
(2, 1, 0.02), 
(3, 13, 0.02), 
(4, 15, 0.02), 
(5, 14, 0.02), 
(6, 8, 0.059), 
(7, 9, 0.059)
;



INSERT INTO orders 
(order_id, menu_item_id, sales, category_id, date)
VALUES 
(1, 2, 15.99, 1, '2021-11-10'),
(1, 8, 7.99, 2, '2021-11-10'),
(1, 3, 12.99, 1, '2021-11-10'),
(1, 9, 9.99, 3, '2021-11-10'),
(1, 3, 12.99, 1, '2021-11-10'),
(1, 4, 3.99, 4, '2021-11-10'),
(2, 1, 14.99, 1, '2021-11-10'),
(2, 6, 7.99, 2, '2021-11-10'),
(2, 3, 12.99, 1, '2021-11-10'),
(2, 9, 9.99, 3, '2021-11-10'),
(3, 3, 12.99, 1, '2021-11-10'),
(3, 5, 3.99, 4, '2021-11-10'),
(3, 2, 15.99, 1, '2021-11-10'),
(3, 8, 7.99, 2, '2021-11-10'),
(3, 3, 12.99, 1, '2021-11-10'),
(4, 9, 9.99, 3, '2021-11-10'),
(4, 3, 12.99, 1, '2021-11-10'),
(4, 4, 3.99, 4, '2021-11-10'),
(5, 1, 14.99, 1, '2021-11-09'),
(5, 6, 7.99, 2, '2021-11-09'),
(5, 3, 12.99, 1, '2021-11-09'),
(5, 9, 9.99, 3, '2021-11-09'),
(5, 3, 12.99, 1, '2021-11-09'),
(6, 4, 3.99, 4, '2021-11-09'),
(6, 2, 15.99, 1, '2021-11-09'),
(7, 7, 7.99, 2, '2021-11-09'),
(7, 3, 12.99, 1, '2021-11-09'),
(7, 9, 9.99, 3, '2021-11-09'),
(8, 3, 12.99, 1, '2021-11-09'),
(8, 5, 3.99, 4, '2021-11-09'),
(8, 2, 15.99, 1, '2021-11-09'),
(9, 8, 7.99, 2, '2021-11-09'),
(9, 3, 12.99, 1, '2021-11-09'),
(9, 9, 9.99, 3, '2021-11-09'),
(9, 3, 12.99, 1, '2021-11-09'),
(9, 5, 3.99, 4, '2021-11-09'),
(10, 2, 15.99, 1, '2021-11-08'),
(10, 8, 7.99, 2, '2021-11-08'),
(11, 3, 12.99, 1, '2021-11-08'),
(11, 9, 9.99, 3, '2021-11-08'),
(11, 3, 12.99, 1, '2021-11-08'),
(11, 4, 3.99, 4, '2021-11-08');




















































































































