const db = require('../db');
const app = require('../app');
const request = require('supertest');

const Product = require('../models/product');
const Supplier = require('../models/supplier');

const {
	NotFoundError,
	BadRequestError,
	UnauthorizedError
} = require('../expressError');
const {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
	u1Token
} = require('../routes/_testCommon');
beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);
describe('GET', function() {
	test('can get purchases with inventory id', async function() {
		const inventories = await db.query(`SELECT * FROM inventories`);
		const inventory_id = inventories.rows[0].id;

		const resp = await request(app)
			.get(`/purchases/${inventory_id}`)
			.set('authorization', `Bearer ${u1Token}`);
		expect(resp.statusCode).toEqual(200);
		const purchase = resp.body.purchases[0];
		expect(purchase.id).toEqual(expect.any(Number));
		expect(purchase.inventory_id).toEqual(expect.any(Number));
		expect(purchase.category_id).toEqual(expect.any(Number));
		expect(purchase.amount).toEqual(1);
		expect(purchase.restaurant_id).toEqual(1);
	});
});

describe('POST', function() {
	test('can add purchases', async function() {
		const inventories = await db.query(`SELECT * FROM inventories`);
		const inventory_id = inventories.rows[0].id;
		const categories = await db.query(`SELECT * FROM categories`);
		const category_id = categories.rows[0].id;
		const purchaseObj = {
			inventory_id,
			category_id,
			amount       : 1
		};
		const resp = await request(app)
			.post('/purchases')
			.send(purchaseObj)
			.set('authorization', `Bearer ${u1Token}`);
		expect(resp.statusCode).toEqual(200);
		const purchase = resp.body.purchase;
		expect(purchase.inventory_id).toEqual(expect.any(Number));
		expect(purchase.category_id).toEqual(expect.any(Number));
		expect(purchase.amount).toEqual(1);
	});
});
