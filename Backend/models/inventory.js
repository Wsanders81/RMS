const db = require('../db')

class Inventory {
    //** Get all inventories within specific dates */
    static async getAllInventories({begDate, endDate}){
        const res = await db.query(`
        SELECT * FROM inventories WHERE date >= $1 AND date <= $2`, 
        [begDate, endDate]); 
        if(!res.rows) return ('error')
        return res.rows; 
    }


    //** Get inventory by date */
    static async getInventory(inv_id){
        const res = await db.query(`
        SELECT * FROM inventories 
        WHERE id = $1`, 
        [inv_id])
        const id = res.rows[0].id
        const items = await db.query(`
        SELECT p.name AS product_name, p.price, p.id,  p.unit, c.category_name, s.name AS supplier_name, i.quantity
            FROM products AS p
            JOIN inventory_items AS i
            ON i.product_id = p.id
            JOIN categories AS c
            ON p.category_id = c.id
            JOIN suppliers AS s
            ON p.supplier_id = s.id
            WHERE i.inventory_id = ${id}
            ORDER BY c.category_name`)
        const food = await db.query(`SELECT p.name AS product_name, p.price, p.id,  p.unit, c.category_name, s.name AS supplier_name, i.quantity
        FROM products AS p
        JOIN inventory_items AS i
        ON i.product_id = p.id
        JOIN categories AS c
        ON p.category_id = c.id
        JOIN suppliers AS s
        ON p.supplier_id = s.id
        WHERE i.inventory_id = ${id}
        AND c.category_name = 'food'
        ORDER BY p.name`)
        const alcohol = await db.query(`SELECT p.name AS product_name, p.price, p.id,  p.unit, c.category_name, s.name AS supplier_name, i.quantity
        FROM products AS p
        JOIN inventory_items AS i
        ON i.product_id = p.id
        JOIN categories AS c
        ON p.category_id = c.id
        JOIN suppliers AS s
        ON p.supplier_id = s.id
        WHERE i.inventory_id = ${id}
        AND c.category_name = 'alcohol'
        ORDER BY p.name`)
        const beer = await db.query(`SELECT p.name AS product_name, p.price, p.id,  p.unit, c.category_name, s.name AS supplier_name, i.quantity
        FROM products AS p
        JOIN inventory_items AS i
        ON i.product_id = p.id
        JOIN categories AS c
        ON p.category_id = c.id
        JOIN suppliers AS s
        ON p.supplier_id = s.id
        WHERE i.inventory_id = ${id}
        AND c.category_name = 'beer'
        ORDER BY p.name`)

        const NABev = await db.query(`SELECT p.name AS product_name, p.price, p.id,  p.unit, c.category_name, s.name AS supplier_name, i.quantity
        FROM products AS p
        JOIN inventory_items AS i
        ON i.product_id = p.id
        JOIN categories AS c
        ON p.category_id = c.id
        JOIN suppliers AS s
        ON p.supplier_id = s.id
        WHERE i.inventory_id = ${id}
        AND c.category_name = 'NA Beverage'
        ORDER BY p.name`)
        res.rows[0].items = items.rows
        res.rows[0].food = food.rows
        res.rows[0].alcohol = alcohol.rows
        res.rows[0].beer = beer.rows
        res.rows[0].NABev = NABev.rows
        if(!res.rows[0]) return ("error")
        return res.rows[0]
    }

    //** Get inventory for specified date */
    static async addInventory(data){

        //** Check for dupe inventory */
        const inventory = await db.query(`
        SELECT * FROM inventories 
        WHERE date = $1`, 
        [data.date])
        if(inventory.rows[0]) return ({message: "Duplicate Inventory"})
         const res = await db.query(`
         INSERT INTO inventories
         (date, food_sales, alcohol_sales, beer_sales, na_bev_sales, beg_food, beg_alcohol, beg_beer, beg_na_bev)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         RETURNING id, date, food_sales, alcohol_sales, beer_sales, na_bev_sales, beg_food, beg_alcohol, beg_beer, beg_na_bev`, 
         [
             data.date, 
             data.food_sales, 
             data.alcohol_sales, 
             data.beer_sales, 
             data.na_bev_sales, 
             data.beg_food, 
             data.beg_alcohol, 
             data.beg_beer, 
             data.beg_na_bev
         ])
         return res.rows[0]; 
    }

    //* Add inventory items
    static async addInventoryItems(inventoryId, {items}){
        
        const promises = items.map(async(item)=> {
            const res = await db.query(`
            INSERT INTO inventory_items
            VALUES ($1, $2, $3, $4)
            RETURNING supplier_id, product_id, quantity`, [inventoryId, item.supplier_id, item.product_id, item.quantity])
            return res.rows[0]
            ;  
        })    
        const invItems = await Promise.all(promises)
        return invItems
    }

    //** Delete inventory */
    static async deleteInventory(id){
        
        const res = await db.query(`
        DELETE FROM inventories WHERE id = $1
        RETURNING id
        `, [id])
        if(!res.rows[0]) return "error"
        return "Inventory successfully deleted"
        
    }
}

module.exports = Inventory; 

