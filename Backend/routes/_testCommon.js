'use strict';

const db = require('../db');
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
	await db.query('DELETE FROM menu_items');
	await db.query('DELETE FROM products');
	await db.query('DELETE FROM sales');
	await db.query('DELETE FROM suppliers');

	await User.register({
		username  : 'test',
		firstName : 'test',
		lastName  : 'user',
		email     : 'test@test.com',
		password  : 'password',
		isAdmin   : false
	});
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
