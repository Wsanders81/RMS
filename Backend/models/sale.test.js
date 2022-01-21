const db = require('../db');
const app = require('../app');
const Sale = require('../models/sale');

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

beforeAll(async function before() {
	await db.query(`INSERT INTO categories(category_name) VALUES('food')`);

	const category = await db.query(`SELECT * FROM categories`);
	const categoryId = category.rows[0].id;
	const rest = await db.query(`SELECT * FROM restaurants`);
	const restaurant_id = rest.rows[0].id;
	await Sale.addSales({
		date          : '2022-01-19',
		categoryId,
		sales         : 5000,
		restaurant_id
	});
});
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe('GET & POST', function() {
	test('Can add sales', async function() {
		const rest = await db.query(`SELECT * FROM restaurants`);
		const restaurant_id = rest.rows[0].id;
		const category = await db.query(`SELECT * FROM categories`);

		const sales = await Sale.addSales({
			date          : '2022-01-18',
			categoryId    : category.rows[0].id,
			sales         : 5000,
			restaurant_id
		});
		expect(sales.id).toEqual(expect.any(Number));
		expect(sales.category_id).toEqual(expect.any(Number));
		expect(sales.sales).toEqual(5000);
	});
	test('Can retrieve sales', async function() {
		const rest = await db.query(`SELECT * FROM restaurants`);
		const restaurant_id = rest.rows[0].id;
		const sale = await Sale.getSales({
			begDate       : '2022-01-19',
			endDate       : '2022-01-19',
			restaurant_id
		});
		expect(sale[0].id).toEqual(expect.any(Number));
		expect(sale[0].sales).toEqual(5000);
		expect(sale[0].category_name).toEqual(expect.any(String));
	});
});
describe('DELETE', function() {
	test('Can delete sales', async function() {
		const rest = await db.query(`SELECT * FROM restaurants`);
		const restaurant_id = rest.rows[0].id;
		const sale = await Sale.getSales({
			begDate       : '2022-01-19',
			endDate       : '2022-01-19',
			restaurant_id
		});
		// console.log(sale[0])
		const id = sale[0].id;
		const deleteSale = await Sale.removeSales(id);
		expect(deleteSale).toEqual('Successfully deleted');
	});
});
