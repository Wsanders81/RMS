'use strict';

const db = require('../db');
const app = require('../app');
const User = require('../models/user');
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

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe('authenticate', function() {
	test('works', async function() {
		const user = await User.authenticate('u1', 'password1');
		
		expect(user.username).toEqual('u1');
		expect(user.first_name).toEqual('U1F');
		expect(user.last_name).toEqual('U1L');
		expect(user.email).toEqual('u1@email.com');
		expect(user.isAdmin).toBeFalsy();
		expect(user.restaurant_name).toEqual('Demo Restaurant');
		expect(user.restaurant_id).toEqual(expect.any(Number));
	});
	test('unauthorized if user does not exist', async function() {
		try {
			await User.authenticate('wrong', 'wrong');
			fail();
		} catch (err) {
			expect(err instanceof UnauthorizedError).toBeTruthy();
		}
	});
});

describe('register', function() {
	const newUser = {
		username       : 'new',
		firstName      : 'Test',
		lastName       : 'Tester',
		email          : 'test@test.com',
		isAdmin        : false,
		restaurantName : 'test1234'
	};

	test('works', async function() {
		let user = await User.register({
			...newUser,
			password : 'password'
		});
		expect(user.email).toEqual('test@test.com');
		expect(user.firstName).toEqual('Test');
		expect(user.lastName).toEqual('Tester');
		expect(user.restaurant_id).toEqual(expect.any(Number));
		const found = await db.query(
			"SELECT * FROM users WHERE username = 'new'"
		);
		expect(found.rows.length).toEqual(1);
		expect(found.rows[0].is_admin).toEqual(false);
		expect(found.rows[0].password.startsWith('$2b$')).toEqual(true);
	});
	test('works: adds admin', async function() {
		let user = await User.register({
			...newUser,
			password : 'password',
			isAdmin  : true
		});
		expect(user.email).toEqual('test@test.com');
		expect(user.firstName).toEqual('Test');
		expect(user.lastName).toEqual('Tester');
		expect(user.restaurant_id).toEqual(expect.any(Number));

		const found = await db.query(
			"SELECT * FROM users WHERE username = 'new'"
		);
		expect(found.rows.length).toEqual(1);
		expect(found.rows[0].is_admin).toEqual(true);
		expect(found.rows[0].password.startsWith('$2b$')).toEqual(true);
	});
	test('bad request with dupe data', async function() {
		try {
			await User.register({
				...newUser,
				password : 'password'
			});
			await User.register({
				...newUser,
				password : 'password'
			});
			fail();
		} catch (err) {
			expect(err instanceof BadRequestError).toBeTruthy();
		}
	});
});
