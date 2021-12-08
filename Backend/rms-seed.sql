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
    ('NA Beverage');

INSERT INTO suppliers (name, address, phone, email)
VALUES (
    'Sysco', 
    '123 Sysco Way', 
    555451234, 
    'sysco@sysco.com'
), (
    'Markstein', 
    '150 Main St.', 
     123000234, 
    'markstein@markstein.net'
), (
    'Coca Cola',
    '600 Cola Way', 
     505300404, 
    'fizzy@coke.com' 
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
('Bacon', 'case', 65, 100, 1, 1),
('Ground Beef Chuck', 'lbs', 75, 50, 1, 1 );

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
('2021-11-07', 4, 2000); 

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
(1, 1, 1), 
(1, 2, 1),
(1, 3, 0.5), 
(1, 4, 2), 
(2, 5, 2),
(2, 2, 0.5),
(2, 1, 1), 
(3, 13, 1), 
(4, 14, 1), 
(5, 8, 1), 
(6, 6, 1), 
(7, 7, 1),
(2, 17, 1)
;

INSERT INTO inventories ( date, food_sales, alcohol_sales, beer_sales, na_bev_sales, beg_food, beg_alcohol, beg_beer, beg_na_bev )
VALUES ('2021-11-10', 50000, 5000, 10000, 1500, 500, 500, 500, 500); 

INSERT INTO inventory_items 
(inventory_id, supplier_id, product_id, quantity)
VALUES 
(1, 1, 1, 10), 
(1, 1, 2, 1.5), 
(1, 1, 3, 4), 
(1, 1, 4, 1.5), 
(1, 1, 5, 1.5), 
(1, 2, 6, 2), 
(1, 2, 7, 2), 
(1, 2, 8, 1.75), 
(1, 2, 9, 1.5), 
(1, 2, 10, 1.5), 
(1, 2, 11, 1.5), 
(1, 2, 12, 1.5), 
(1, 1, 13, 2), 
(1, 3, 14, 2), 
(1, 3, 15, 2); 

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




















































































































