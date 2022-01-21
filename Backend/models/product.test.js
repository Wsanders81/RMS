const db = require('../db');

const app = require('../app');
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
	commonAfterAll
} = require('./_testCommon');
beforeAll(async function() {
	await db.query(`INSERT INTO categories(category_name) VALUES('food')`);
	const category = await db.query(`SELECT * FROM categories`);
	const category_id = category.rows[0].id;
	const rest = await db.query(`SELECT * FROM restaurants`);
	const restaurant_id = rest.rows[0].id;
	const supplier = await Supplier.addSupplier(
		'Test',
		'123 test',
		5551234567,
		'test@test.com',
		restaurant_id
	);
	const supplier_id = supplier.id;
	await Product.create(
		'Fried Chicken Patties',
		'case',
		50,
		50,
		supplier_id,
		category_id,
		1,
		restaurant_id
	);
});
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe('POST', function() {
	test('Can create product', async function() {
		const category = await db.query(`SELECT * FROM categories`);

		const category_id = category.rows[0].id;
		const rest = await db.query(`SELECT * FROM restaurants`);
		const restaurant_id = rest.rows[0].id;
		const supplier = await db.query(`SELECT * FROM suppliers`);
		const supplier_id = supplier.rows[0].id;
		const product = await Product.create(
			'Test Item',
			'case',
			50,
			50,
			supplier_id,
			category_id,
			1,
			restaurant_id
		);
		expect(product.id).toEqual(expect.any(Number));
		expect(product.name).toEqual('Test Item');
		expect(product.price).toEqual(50);
		expect(product.unit).toEqual('case');
		expect(product.qty_per_unit).toEqual(50);
		expect(product.supplier_id).toEqual(expect.any(Number));
	});
});
//** need to add restaurant ID to actions.js routes first */
// describe("GET", function(){
//     test("Can get all items", async function(){
//         const category = await db.query(`SELECT * FROM categories`);
// 		const category_id = category.rows[0].id;
// 		const rest = await db.query(`SELECT * FROM restaurants`);
// 		const restaurant_id = rest.rows[0].id;
// 		const supplier = await db.query(`SELECT * FROM suppliers`);
// 		const supplier_id = supplier.rows[0].id;
//         const product = await Product.create(
// 			'Test Item',
// 			'case',
// 			50,
// 			50,
// 			supplier_id,
// 			category_id,
// 			1,
// 			restaurant_id
// 		); 
//         console.log(product.rows)
//         const products = await Product.getAllProducts(); 
//         expect(products).toEqual("LK")  
//     }) 
// }) 
