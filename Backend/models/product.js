const db = require('../db')

class Product {
	//** Create product */
	//** data should be { name, unit, qty_per_unit, price, supplier_id, category_id} */
	//** returns all info */
	static async create(data) {
		const res = await db.query(
			`INSERT INTO products (
                name,
                unit, 
                qty_per_unit, 
                price, 
                supplier_id, 
                category_id) 
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id, name, unit, qty_per_unit, price, supplier_id, category_id`,
			[
				data.name,
				data.unit,
				data.qty_per_unit,
				data.price,
				data.supplier_id,
				data.category_id
			]
		);
        let product = res.rows[0]; 
        return product; 
	}

	static async getAllProducts(){
		const res = await db.query(`
		SELECT * FROM PRODUCTS`)
		const products = res.rows
		return products; 
	}

	static async deleteProduct(product_id){
		const res = await db.query(`
		DELETE FROM products WHERE id = $1 RETURNING id, name`, 
		[product_id])
		if(!res.rows[0]) return ("error")
		return ("Successfully deleted")
	}

    
}

module.exports = Product
