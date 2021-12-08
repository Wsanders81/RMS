DROP TABLE IF EXISTS users; 
DROP TABLE IF EXISTS sales; 
DROP TABLE IF EXISTS inventory_items; 
DROP TABLE IF EXISTS menu_item_ingredients; 
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS menu_items; 
DROP TABLE IF EXISTS products; 
DROP TABLE IF EXISTS inventories;
DROP TABLE IF EXISTS suppliers; 
DROP TABLE IF EXISTS categories; 

CREATE TABLE users (
    username VARCHAR(25) PRIMARY KEY, 
    password TEXT NOT NULL, 
    first_name TEXT NOT NULL, 
    last_name TEXT NOT NULL, 
    email TEXT NOT NULL, 
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
    notes TEXT
);

-- thinking of adding state to this table (active, inactive)
-- ** Add quantity? to validate against inventory and track discrepancies / usage
CREATE TABLE products (
    id SERIAL PRIMARY KEY, 
    name TEXT UNIQUE NOT NULL,
    unit TEXT NOT NULL, 
    qty_per_unit INTEGER NOT NULL, 
    price FLOAT NOT NULL, 
    quantity INTEGER DEFAULT 0,
    supplier_id INTEGER REFERENCES suppliers
        ON DELETE CASCADE, 
    category_id INTEGER REFERENCES categories
        ON DELETE CASCADE

);



-- Just for holding inventory with date and sales
CREATE TABLE inventories (
    id SERIAL PRIMARY KEY, 
    date DATE NOT NULL , 
    food_sales INTEGER NOT NULL, 
    alcohol_sales INTEGER NOT NULL, 
    beer_sales INTEGER NOT NULL, 
    na_bev_sales INTEGER NOT NULL, 
    beg_food INTEGER NOT NULL, 
    beg_alcohol INTEGER NOT NULL,
    beg_beer INTEGER NOT NULL,
    beg_na_bev INTEGER NOT NULL
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
    quantity INTEGER DEFAULT 0

);

CREATE TABLE sales (
    id SERIAL PRIMARY KEY, 
    date DATE DEFAULT CURRENT_DATE, 
    category_id INTEGER REFERENCES categories 
        ON DELETE CASCADE,
    sales FLOAT NOT NULL
); 

CREATE TABLE menu_items (
    id SERIAL PRIMARY KEY, 
    name VARCHAR(25) UNIQUE NOT NULL, 
    category_id INTEGER REFERENCES categories
        ON DELETE CASCADE,
    price FLOAT
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
    date DATE NOT NULL DEFAULT CURRENT_DATE
); 

CREATE TABLE purchases (
    id SERIAL PRIMARY KEY, 
    inventory_id INTEGER REFERENCES inventories
        ON DELETE CASCADE, 
    category_id INTEGER REFERENCES categories
        ON DELETE CASCADE,
    amount FLOAT NOT NULL
);


