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
beforeAll(async function before() {
	const rest = await db.query(`SELECT * FROM restaurants`);
	await db.query(
		`INSERT INTO suppliers (name, address, phone, email, restaurant_id)
VALUES (
	'Test Supplier 4', 
	'123 Test Way', 
	5554512344, 
	'test@test.com',
	$1
)`,
		[ rest.rows[0].id ]
	);
});
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe('GET', function() {
	test('can retrieve suppliers', async function() {
		const resp = await request(app)
			.get('/suppliers/1')
			.set('authorization', `Bearer ${u1Token}`);
		expect(resp.statusCode).toEqual(200);
		const supplier = resp.body.suppliers[0];
		expect(supplier.id).toEqual(expect.any(Number));
		expect(supplier.address).toEqual('123 Test Way');
		expect(supplier.phone).toEqual('5554512344');
		expect(supplier.email).toEqual('test@test.com');
	});
});
describe('POST', function() {
	test('only admin can add supplier', async function() {
		const supplierObj = {
			name         : 'abcd',
			address      : 'abcd',
			phone        : 1234567890,
			email        : 'abcd@efg.com',
			restuarantId : 1
		};
		const regularUserResp = await request(app)
			.post('/suppliers/new')
			.send(supplierObj)
			.set('authorization', `Bearer ${u1Token}`);
		expect(regularUserResp.statusCode).toEqual(401);
		const adminResp = await request(app)
			.post('/suppliers/new')
			.send({ data: supplierObj })
			.set('authorization', `Bearer ${adminToken}`);
		expect(adminResp.statusCode).toEqual(200);
	});
});
describe('DELETE', function() {
	test('only admin can delete supplier', async function() {
		const supplier = await request(app)
			.get('/suppliers/1')
			.set('authorization', `Bearer ${u1Token}`);
		const supplierId = supplier.body.suppliers[0].id;
		const regularUserResp = await request(app)
			.delete(`/suppliers/${supplierId}`)
			.set('authorization', `Bearer ${u1Token}`);
		expect(regularUserResp.statusCode).toEqual(401);
		const adminResp = await request(app)
			.delete(`/suppliers/${supplierId}`)
			.set('authorization', `Bearer ${adminToken}`);

		expect(adminResp.statusCode).toEqual(200);
	});
});
