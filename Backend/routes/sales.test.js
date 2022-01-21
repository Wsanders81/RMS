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
	u1Token,
	adminToken
} = require('../routes/_testCommon');
beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);
describe('GET', function() {
	test('can retrieve sales', async function() {
		const resp = await request(app)
			.get('/sales/2022-01-12/2022-01-12/1')
			.set('authorization', `Bearer ${u1Token}`);
		const sale = resp.body.sales[0];
		expect(resp.statusCode).toEqual(200);
		expect(sale.id).toEqual(expect.any(Number));
		expect(sale.sales).toEqual(1);
		expect(sale.category_name).toEqual('beer');
	});
});
describe('POST', function() {
	test('only admin can post sales', async function() {
		const category = await db.query(`SELECT * FROM categories`);
		const categoryId = category.rows[0].id;

		const saleObj = {
			date          : '2022-01-01',
			categoryId,
			sales         : 1,
			restaurant_id : 1
		};
		const regularUserResp = await request(app)
			.post('/sales/add')
			.send(saleObj)
			.set('authorization', `Bearer ${u1Token}`);
		expect(regularUserResp.statusCode).toEqual(401);
		const adminResp = await request(app)
			.post('/sales/add')
			.send(saleObj)
			.set('authorization', `Bearer ${adminToken}`);
		expect(adminResp.statusCode).toEqual(200);
		const sale = adminResp.body.sales;
		expect(sale.id).toEqual(expect.any(Number));
		expect(sale.sales).toEqual(1);
	});
});
describe('DELETE', function() {
	test('only admin can delete sales', async function() {
		const salesResp = await request(app)
			.get('/sales/2022-01-12/2022-01-12/1')
			.set('authorization', `Bearer ${u1Token}`);
		const saleId = salesResp.body.sales[0].id;
		const regularUserResp = await request(app)
			.delete(`/sales/${saleId}`)
			.set('authorization', `Bearer ${u1Token}`);
		expect(regularUserResp.statusCode).toEqual(401);
		const adminResp = await request(app)
			.delete(`/sales/${saleId}`)
			.set('authorization', `Bearer ${adminToken}`);
		expect(adminResp.statusCode).toEqual(200);
		expect(adminResp.body.message).toEqual('Successfully deleted');
	});
	test('throws error if sales not found', async function() {
		const adminResp = await request(app)
			.delete(`/sales/1`)
			.set('authorization', `Bearer ${adminToken}`);
		expect(adminResp.statusCode).toEqual(400);
	});
});
