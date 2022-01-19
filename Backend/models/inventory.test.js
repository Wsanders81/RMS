const db = require('../db');
const app = require('../app');
const Inventory = require('../models/inventory')

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

describe("GET", function(){
    test('Can retrieve inventories using restaurant id', async function(){
        const restaurant = await db.query(`SELECT * FROM restaurants`)
        const inventoryObject = {
            begDate: "2022-01-18", 
            endDate: "2022-01-18", 
            restaurant_id: restaurant.rows[0].id
        }
        
        const inventories = await Inventory.getAllInventories(inventoryObject)
        expect(inventories[0].id).toEqual(expect.any(Number))
    })
})
describe("POST", function(){
    test('Can add inventory', async function(){
        const rest = await db.query(`SELECT * FROM restaurants`)
        const data = {
            date: "2022-01-19", 
            food_sales: 25000, 
            alcohol_sales: 5000, 
            beer_sales: 4000, 
            na_bev_sales: 2000, 
            beg_food: 1400, 
            beg_alcohol: 480, 
            beg_beer: 250, 
            beg_na_bev: 100, 
            restaurant_id: rest.rows[0].id
        }
        const inventory = await Inventory.addInventory(data)
        expect(inventory.food_sales).toEqual(data.food_sales)
        expect(inventory.alcohol_sales).toEqual(data.alcohol_sales)
        expect(inventory.beer_sales).toEqual(data.beer_sales)
        expect(inventory.na_bev_sales).toEqual(data.na_bev_sales)

    })
})