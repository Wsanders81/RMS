'use strict';

const db = require('../db');
const app = require('../app');
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
	commonAfterAll
} = require('./_testCommon');

beforeAll(
	async function before(){
	const rest = await db.query(`SELECT * FROM restaurants`)
	await db.query(
	`INSERT INTO suppliers (name, address, phone, email, restaurant_id)
VALUES (
	'Test Supplier', 
	'123 Test Way', 
	5554512344, 
	'test@test.com',
	$1
)`,
	[ rest.rows[0].id ]
);});
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe('GET', function() {
	
	test('works getting single supplier', async function() {
		const supplier = await db.query(
			`SELECT * FROM suppliers `
		);
		expect(supplier.rows[0].address).toEqual('123 Test Way');
		expect(supplier.rows[0].email).toEqual('test@test.com');
		expect(supplier.rows[0].name).toEqual('Test Supplier');
		expect(supplier.rows[0].phone).toEqual('5554512344');
	});
	
	
});
describe("POST", function(){
	test('can add new supplier', async function() {
		const restaurant = await db.query('SELECT * FROM restaurants')
		const newSupplier = await Supplier.addSupplier(
			'TestSupplier2',
			'123 Test way',
			5554512344,
			'test@test.com',
			restaurant.rows[0].id
		);
        expect(newSupplier.address).toEqual('123 Test way');
		expect(newSupplier.email).toEqual('test@test.com');
		expect(newSupplier.name).toEqual('TestSupplier2');
		expect(newSupplier.phone).toEqual('5554512344');
        expect(newSupplier.id).toEqual(expect.any(Number))
		
        
	});

	test('add fails if dupe supplier', async function() {
		try {
			const restaurant = await db.query('SELECT * FROM restaurants')

			const newSupplier = await Supplier.addSupplier(
				'TestSupplier',
				'123 Test way',
				5554512344,
				'test@test.com',
				restaurant.rows[0].id
			);
		} catch (err) {
			expect(err instanceof BadRequestError).toBeTruthy();
		}
	});
})
// describe('DELETE', function(){
// 	test('can delete supplier', async function() {
// 		const supplier = await db.query(
// 			`SELECT * FROM suppliers`
// 		);
// 		const deleteSupplier = await Supplier.deleteSupplier(
// 			supplier.rows[0].id
// 		);
// 		expect(deleteSupplier.id).toEqual(expect.any(Number));
// 	});
// })
