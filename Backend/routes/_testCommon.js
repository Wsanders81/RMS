'use strict';

const db = require('../db');
const bcrypt = require('bcrypt');
const { BCRYPT_WORK_FACTOR } = require('../config');

const User = require('../models/user');
const Inventory = require('../models/inventory');
const MenuItem = require('../models/menuItem');
const Product = require('../models/product');
const Sale = require('../models/sale');
const Supplier = require('../models/supplier');
const { createToken } = require('../helpers/tokens');

async function commonBeforeAll() {
	await db.query('DELETE FROM users');
	await db.query('DELETE FROM inventories');
	// await db.query('DELETE FROM menu_items');
	// await db.query('DELETE FROM products');
	// await db.query('DELETE FROM sales');
	// await db.query('DELETE FROM suppliers');
	const rest = await db.query(`select * from restaurants`);
	await db.query(
		`
        INSERT INTO users(username,
                          password,
                          first_name,
                          last_name,
                          email, 
                          restaurant_id)
        VALUES ('u1', $1, 'U1F', 'U1L', 'u1@email.com', $3),
               ('u2', $2, 'U2F', 'U2L', 'u2@email.com', $4)
        `,
		[
			await bcrypt.hash('password1', BCRYPT_WORK_FACTOR),
			await bcrypt.hash('password2', BCRYPT_WORK_FACTOR),
			rest.rows[0].id,
			rest.rows[0].id
		]
	);
	await db.query(
		`INSERT INTO inventories(date, food_sales, alcohol_sales, beer_sales, na_bev_sales, beg_food, beg_alcohol, beg_beer, beg_na_bev, restaurant_id )
    VALUES(
        '2022-01-18', 
        25000,
        10000,
        8000,
        2000,
        2000,
        1200,
        500,
        250,
        $1
    )`,
		[ rest.rows[0].id ]
	);
}

async function commonBeforeEach() {
	await db.query('BEGIN');
}

async function commonAfterEach() {
	await db.query('ROLLBACK');
}

async function commonAfterAll() {
	await db.end();
}
const u1Token = createToken({ username: 'u1', is_admin: false });
const adminToken = createToken({ username: 'admin', is_admin: true });

module.exports = {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
	u1Token,
	adminToken
};
