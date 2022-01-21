const bcrypt = require('bcrypt');

const db = require('../db.js');
const { BCRYPT_WORK_FACTOR } = require('../config');
const User = require('../models/user');
async function commonBeforeAll() {
	await db.query('DELETE FROM users');
	await db.query('DELETE FROM suppliers');
	await db.query('DELETE FROM inventories');

	//* Restaurant is hard coded into test database => name = "Demo Restaurant"

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

	const inventory = await db.query(
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
    ) RETURNING id`,
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
	await db.query('DELETE FROM users');
	await db.query('DELETE FROM suppliers');
	await db.query('DELETE FROM inventories');
	await db.query('DELETE FROM sales');
	await db.query('DELETE FROM categories');
	await db.query('DELETE FROM products');
	// await db.query('DELETE FROM restaurants');
	await db.end();
}

module.exports = {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll
};
