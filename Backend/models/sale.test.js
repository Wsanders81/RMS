const db = require('../db');
const app = require('../app');
const Sale = require('../models/sale')

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

beforeAll(async function before(){
    const sales = await Sale.addSales({date:'2022-01-18', categoryId:1, sales: 5000})
});
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

