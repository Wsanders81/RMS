'use strict';

const request = require('supertest');
const Supplier = require('../models/supplier');
const Product = require('../models/product');
const app = require('../app');
const db = require('../db');
const {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
	u1Token,
	adminToken
} = require('./_testCommon');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe('GET', function() {
	test('Can retrieve all inventories with restaurant id', async function() {
		const resp = await request(app)
			.get(`/inventories/all/${'2022-01-18'}/${'2022-01-18'}/1`)
			.set('authorization', `Bearer ${u1Token}`);
		expect(resp.statusCode).toEqual(200);
		expect(resp.body[0].id).toEqual(expect.any(Number));
		expect(resp.body[0].food_sales).toEqual(25000);
		expect(resp.body[0].beer_sales).toEqual(8000);
		expect(resp.body[0].alcohol_sales).toEqual(10000);
		expect(resp.body[0].na_bev_sales).toEqual(2000);
		expect(resp.body[0].beg_food).toEqual(2000);
		expect(resp.body[0].beg_alcohol).toEqual(1200);
		expect(resp.body[0].beg_beer).toEqual(500);
		expect(resp.body[0].beg_na_bev).toEqual(250);
		expect(resp.body[0].restaurant_id).toEqual(1);
	});
	test('Can retrieve inventory by id', async function() {
		const availableInventories = await request(app)
			.get(`/inventories/all/${'2022-01-18'}/${'2022-01-18'}/1`)
			.set('authorization', `Bearer ${u1Token}`);

		const inventoryId = availableInventories.body[0].id;
		const resp = await request(app)
			.get(`/inventories/${inventoryId}`)
			.set('authorization', `Bearer ${u1Token}`);
		expect(resp.statusCode).toEqual(200);
		expect(resp.body.inventory.id).toEqual(expect.any(Number));
		expect(resp.body.inventory.food_sales).toEqual(25000);
		expect(resp.body.inventory.beer_sales).toEqual(8000);
		expect(resp.body.inventory.alcohol_sales).toEqual(10000);
		expect(resp.body.inventory.na_bev_sales).toEqual(2000);
		expect(resp.body.inventory.beg_food).toEqual(2000);
		expect(resp.body.inventory.beg_alcohol).toEqual(1200);
		expect(resp.body.inventory.beg_beer).toEqual(500);
		expect(resp.body.inventory.beg_na_bev).toEqual(250);
		expect(resp.body.inventory.restaurant_id).toEqual(1);
	});
});
describe('POST', function() {
	test('Can add new inventory', async function() {
		const supplier = await Supplier.addSupplier(
			'Tester Supplier',
			'123 abcdefg ast',
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
		const newInventory = {
			date          : '2022-01-19',
			food_sales    : 1,
			alcohol_sales : 1,
			beer_sales    : 1,
			na_bev_sales  : 1,
			beg_food      : 1,
			beg_alcohol   : 1,
			beg_beer      : 1,
			beg_na_bev    : 1,
			restaurant_id : 1,
			items         : [ { supplier_id, product_id, quantity: 1 } ]
		};
		const resp = await request(app)
			.post(`/inventories/add`)
			.send(newInventory)
			.set('authorization', `Bearer ${u1Token}`);
		expect(resp.statusCode).toEqual(200);
		const inventory = resp.body.inventory;
		expect(inventory.id).toEqual(expect.any(Number));
		expect(inventory.food_sales).toEqual(1);
		expect(inventory.alcohol_sales).toEqual(1);
		expect(inventory.beer_sales).toEqual(1);
		expect(inventory.na_bev_sales).toEqual(1);
		expect(inventory.beg_food).toEqual(1);
		expect(inventory.beg_alcohol).toEqual(1);
		expect(inventory.beg_beer).toEqual(1);
		expect(inventory.beg_na_bev).toEqual(1);
		expect(inventory.restaurant_id).toEqual(1);
	});
	test('cannot enter inventory with duplicate date', async function() {
		const supplier = await Supplier.addSupplier(
			'Tester Supplier',
			'123 abcdefg ast',
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
		const newInventory = {
			date          : '2022-01-19',
			food_sales    : 1,
			alcohol_sales : 1,
			beer_sales    : 1,
			na_bev_sales  : 1,
			beg_food      : 1,
			beg_alcohol   : 1,
			beg_beer      : 1,
			beg_na_bev    : 1,
			restaurant_id : 1,
			items         : [ { supplier_id, product_id, quantity: 1 } ]
		};
		const resp = await request(app)
			.post(`/inventories/add`)
			.send(newInventory)
			.set('authorization', `Bearer ${u1Token}`);
		expect(resp.statusCode).toEqual(200);

		const dupeResp = await request(app)
			.post(`/inventories/add`)
			.send(newInventory)
			.set('authorization', `Bearer ${u1Token}`);
		expect(dupeResp.body.message).toEqual('Duplicate Inventory');
	});
});
describe('DELETE', function() {
	test('can delete inventory as admin not as regular user', async function() {
		const supplier = await Supplier.addSupplier(
			'Tester Supplier',
			'123 abcdefg ast',
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
		const newInventory = {
			date          : '2022-01-19',
			food_sales    : 1,
			alcohol_sales : 1,
			beer_sales    : 1,
			na_bev_sales  : 1,
			beg_food      : 1,
			beg_alcohol   : 1,
			beg_beer      : 1,
			beg_na_bev    : 1,
			restaurant_id : 1,
			items         : [ { supplier_id, product_id, quantity: 1 } ]
		};
		const resp = await request(app)
			.post(`/inventories/add`)
			.send(newInventory)
			.set('authorization', `Bearer ${u1Token}`);
		expect(resp.statusCode).toEqual(200);
		const deleteRegular = await request(app)
			.delete(`/inventories/${resp.body.inventory.id}`)
			.set('authorization', `Bearer ${u1Token}`);
		expect(deleteRegular.statusCode).toEqual(401);
		const deleteAdmin = await request(app)
			.delete(`/inventories/${resp.body.inventory.id}`)
			.set('authorization', `Bearer ${adminToken}`);
		expect(deleteAdmin.statusCode).toEqual(201);
		expect(deleteAdmin.body.message).toEqual("Inventory successfully deleted");
	});
});
