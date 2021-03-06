-- DROP TABLE IF EXISTS users; 
-- DROP TABLE IF EXISTS sales; 
-- DROP TABLE IF EXISTS inventory_items; 
-- DROP TABLE IF EXISTS menu_item_ingredients; 
-- DROP TABLE IF EXISTS order_items;
-- DROP TABLE IF EXISTS orders;
-- DROP TABLE IF EXISTS menu_items; 
-- DROP TABLE IF EXISTS products; 
-- DROP TABLE IF EXISTS inventories;
-- DROP TABLE IF EXISTS suppliers; 
-- DROP TABLE IF EXISTS categories; 

CREATE TABLE restaurants (
    id SERIAL PRIMARY KEY, 
    name TEXT UNIQUE NOT NULL

);

CREATE TABLE users (
    username VARCHAR(25) PRIMARY KEY, 
    password TEXT NOT NULL, 
    first_name TEXT NOT NULL, 
    last_name TEXT NOT NULL, 
    email TEXT NOT NULL, 
    restaurant_id INTEGER REFERENCES restaurants
        ON DELETE CASCADE, 
    is_admin BOOLEAN NOT NULL DEFAULT FALSE
); 

CREATE TABLE categories (
    id SERIAL PRIMARY KEY, 
    category_name TEXT UNIQUE NOT NULL

);

CREATE TABLE suppliers (
    id SERIAL PRIMARY KEY, 
    name TEXT UNIQUE NOT NULL,
    address TEXT NOT NULL, 
    phone VARCHAR(15) NOT NULL, 
    email TEXT NOT NULL 
        CHECK (position('@' IN email) > 1), 
    restaurant_id INTEGER REFERENCES restaurants
        ON DELETE CASCADE, 
    notes TEXT
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY, 
    name TEXT UNIQUE NOT NULL,
    unit TEXT NOT NULL, 
    qty_per_unit INTEGER NOT NULL, 
    price FLOAT NOT NULL, 
    quantity FLOAT DEFAULT 0,
    supplier_id INTEGER REFERENCES suppliers
        ON DELETE CASCADE, 
    category_id INTEGER REFERENCES categories
        ON DELETE CASCADE, 
    restaurant_id INTEGER REFERENCES restaurants
        ON DELETE CASCADE

);



-- Just for holding inventory with date and sales
CREATE TABLE inventories (
    id SERIAL PRIMARY KEY, 
    date DATE NOT NULL , 
    food_sales FLOAT NOT NULL , 
    alcohol_sales FLOAT NOT NULL , 
    beer_sales FLOAT NOT NULL , 
    na_bev_sales FLOAT NOT NULL , 
    beg_food FLOAT NOT NULL , 
    beg_alcohol FLOAT NOT NULL ,
    beg_beer FLOAT NOT NULL ,
    beg_na_bev FLOAT NOT NULL, 
    restaurant_id INTEGER REFERENCES restaurants 
        ON DELETE CASCADE
);

-- This will hold the inventory count 
-- can access price via FK. 
CREATE TABLE inventory_items (
    inventory_id INTEGER REFERENCES inventories
        ON DELETE CASCADE,
    supplier_id INTEGER REFERENCES suppliers
        ON DELETE CASCADE, 
    product_id INTEGER REFERENCES products 
        ON DELETE CASCADE, 
    quantity FLOAT DEFAULT 0

);

CREATE TABLE sales (
    id SERIAL PRIMARY KEY, 
    date DATE DEFAULT CURRENT_DATE, 
    category_id INTEGER REFERENCES categories 
        ON DELETE CASCADE,
    sales FLOAT NOT NULL, 
    restaurant_id INTEGER REFERENCES restaurants
        ON DELETE CASCADE
); 

CREATE TABLE menu_items (
    id SERIAL PRIMARY KEY, 
    name VARCHAR(25) UNIQUE NOT NULL, 
    category_id INTEGER REFERENCES categories
        ON DELETE CASCADE,
    price FLOAT, 
    restaurant_id INTEGER REFERENCES restaurants
        ON DELETE CASCADE
);

CREATE TABLE menu_item_ingredients (
    id SERIAL PRIMARY KEY, 
    menu_item_id INTEGER REFERENCES menu_items
        ON DELETE CASCADE, 
    product_id INTEGER REFERENCES products
        ON DELETE CASCADE,
    quantity FLOAT NOT NULL
); 

CREATE TABLE orders (
    
    order_id INTEGER NOT NULL, 
    menu_item_id INTEGER REFERENCES menu_items
        ON DELETE CASCADE, 
    sales FLOAT NOT NULL, 
    category_id INTEGER REFERENCES categories
        ON DELETE CASCADE, 
    date DATE NOT NULL DEFAULT CURRENT_DATE, 
    restaurant_id INTEGER REFERENCES restaurants
        ON DELETE CASCADE
); 

CREATE TABLE purchases (
    id SERIAL PRIMARY KEY, 
    inventory_id INTEGER REFERENCES inventories
        ON DELETE CASCADE, 
    category_id INTEGER REFERENCES categories
        ON DELETE CASCADE,
    amount FLOAT NOT NULL, 
    restaurant_id INTEGER REFERENCES restaurants
        ON DELETE CASCADE
);

 
