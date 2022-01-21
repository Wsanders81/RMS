'use strict';

const request = require('supertest');
const Supplier = require('../models/supplier');
const Product = require('../models/product');
const MenuItem = require('../models/menuItem');
const app = require('../app');
const db = require('../db');
const { createToken } = require('../helpers/tokens');

const {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll
} = require('../models/_testCommon');

beforeAll(async function() {
	const supplier = await Supplier.addSupplier(
		'Tester Supplier',
		'123 Test Way',
		1234567890,
		'blah@blah.com',
		1
	);
	const categories = await db.query(
		`INSERT INTO categories(category_name) VALUES('food') RETURNING id`
	);
	const category_id = categories.rows[0].id;
	const supplier_id = supplier.id;
	const product = await Product.create(
		'test',
		'case',
		50,
		50,
		supplier_id,
		category_id,
		1
	);

	const allProducts = await db.query(`SELECT * FROM products`);
	const product_id = allProducts.rows[0].id;
	const menuItem = await MenuItem.createItem({
		name          : 'test',
		category_id,
		price         : 1,
		restaurant_id : 1,
		ingredients   : [ { product_id, quantity: 1 } ]
	});
});
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);
const u1Token = createToken({ username: 'u1', is_admin: false });
const adminToken = createToken({ username: 'admin', is_admin: true });

describe('GET', function() {
	test('can get all menu items with restaurant id', async function() {
		const resp = await request(app)
			.get(`/menuItems/1`)
			.set('authorization', `Bearer ${u1Token}`);

		expect(resp.statusCode).toEqual(200);
		const item = resp.body.items[0];
		expect(item.id).toEqual(expect.any(Number));
		expect(item.name).toEqual('test');
		expect(item.category_id).toEqual(expect.any(Number));
		expect(item.price).toEqual(1);
		expect(item.restaurant_id).toEqual(1);
	});
	test('can get menu item ingredients', async function() {
		const menuItem = await request(app)
			.get(`/menuItems/1`)
			.set('authorization', `Bearer ${u1Token}`);
		const menuItemId = menuItem.body.items[0].id;
		const resp = await request(app)
			.get(`/menuItems/ingredients/${menuItemId}`)
			.set('authorization', `Bearer ${u1Token}`);
		const item = resp.body.items[0];
		expect(resp.statusCode).toEqual(200);
		expect(item.id).toEqual(expect.any(Number));
		expect(item.unit).toEqual('case');
		expect(item.quantity).toEqual(1);
		expect(item.supplier_id).toEqual(expect.any(Number));
	});
});

describe('POST', function() {
	test('can create new menu item', async function() {
		const category = await db.query(`SELECT * FROM categories`);
		const category_id = category.rows[0].id;
		const product = await db.query(`SELECT * FROM products`);
		const product_id = product.rows[0].id;
		const newMenuItem = {
			name          : 'bagel',
			category_id,
			price         : 1,
			restaurant_id : 1,
			ingredients   : [ { product_id, quantity: 1 } ]
		};
		const resp = await request(app)
			.post(`/menuItems/new`)
			.send(newMenuItem)
			.set('authorization', `Bearer ${adminToken}`);
		expect(resp.statusCode).toEqual(200);
		const item = resp.body.item;
		const ingredients = resp.body.item.ingredients;
		expect(item.id).toEqual(expect.any(Number));
		expect(item.name).toEqual(newMenuItem.name);
		expect(item.category_id).toEqual(expect.any(Number));
		expect(item.price).toEqual(newMenuItem.price);
		expect(ingredients[0].quantity).toEqual(
			newMenuItem.ingredients[0].quantity
		);
		expect(ingredients[0].product_id).toEqual(
			newMenuItem.ingredients[0].product_id
		);
	});
});

describe('DELETE', function() {
	test('can delete menu item as admin not as regular user', async function() {
		const menuItems = await MenuItem.getAll(1);
		const menuItemId = menuItems[0].id;
		const regUserResp = await request(app)
			.delete(`/menuItems/${menuItemId}`)
			.set('authorization', `Bearer ${u1Token}`);
		expect(regUserResp.statusCode).toEqual(401);
		const adminUserResp = await request(app)
			.delete(`/menuItems/${menuItemId}`)
			.set('authorization', `Bearer ${adminToken}`);
		expect(adminUserResp.statusCode).toEqual(200);
		expect(adminUserResp.body.message).toEqual('Item has been deleted');
	});
});
