'use strict';

const request = require('supertest');
const Supplier = require('../models/supplier');
const Product = require('../models/product');
const MenuItem = require('../models/menuItem');
const app = require('../app');
const db = require('../db');

const {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
	u1Token,
	adminToken
} = require('../routes/_testCommon');

beforeAll(async function() {
	const supplier = await Supplier.addSupplier(
		'Product Supplier',
		'123 Test Way',
		5554512344,
		'test@test.com',
		1
	);
	const categories = await db.query(
		`INSERT INTO categories(category_name) VALUES('food_test') RETURNING id`
	);
	const category_id = categories.rows[0].id;
	const supplier_id = supplier.id;
	await Product.create('test 1', 'case', 50, 50, supplier_id, category_id, 1);
	await Product.create('test 2', 'case', 50, 50, supplier_id, category_id, 1);
});
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe('GET', function() {
	test('can get product by id', async function() {
		const supplier = await db.query(`SELECT * FROM suppliers`);
		const supplier_id = supplier.rows[0].id;
		const resp = await request(app)
			.get(`/products/${supplier_id}`)
			.set('authorization', `Bearer ${u1Token}`);
		expect(resp.statusCode).toEqual(200);
		const product = resp.body.products[0];
		expect(product.id).toEqual(expect.any(Number));
		expect(product.name).toEqual('test 1');
		expect(product.unit).toEqual('case');
		expect(product.qty_per_unit).toEqual(50);
		expect(product.price).toEqual(50);
	});
});

describe('POST', function() {
	test('can create new product with admin token only', async function() {
		const supplier = await db.query(`SELECT * FROM suppliers`);
		const supplier_id = supplier.rows[0].id;
		const category = await db.query(`SELECT * FROM categories`);
		const category_id = category.rows[0].id;
		const productObj = {
			name              : 'product test',
			unit              : 'case',
			quantity_per_unit : 1,
			price             : 1,
			supplier_id,
			category_id
		};
		const regularUserResp = await request(app)
			.post(`/products`)
			.send(productObj)
			.set('authorization', `Bearer ${u1Token}`);
		expect(regularUserResp.statusCode).toEqual(401);
		const adminResp = await request(app)
			.post('/products')
			.send(productObj)
			.set('authorization', `Bearer ${adminToken}`);
		expect(adminResp.statusCode).toEqual(201);
	});
});

describe('DELETE', function() {
	test('can delete item as admin only', async function() {
		const products = await db.query('SELECT * FROM products');
		const product_id = products.rows[0].id;
		const regularUserResp = await request(app)
			.delete(`/products/${product_id}`)
			.set('authorization', `Bearer ${u1Token}`);
		expect(regularUserResp.statusCode).toEqual(401);
		const adminResp = await request(app)
			.delete(`/products/${product_id}`)
			.set('authorization', `Bearer ${adminToken}`);
		expect(adminResp.statusCode).toEqual(200);
        expect(adminResp.body.message).toEqual("Successfully deleted")
	});
});
