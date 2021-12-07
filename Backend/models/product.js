const db = require('../db');

class Product {
	//** Create product */
	//** data should be { name, unit, qty_per_unit, price, supplier_id, category_id} */
	//** returns all info */
	static async create(name, unit, qty_per_unit, price, supplier_id, category_id) {
		
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
				name,
				unit,
				qty_per_unit,
				price,
				supplier_id,
				category_id
			]
		);
		let product = res.rows[0];
		return product;
	}

	static async getAllProducts() {
		const res = await db.query(`
		SELECT p.id AS product_id, p.name, p.unit, p.qty_per_unit, 
		p.price, c.category_name
		FROM products AS p
		JOIN categories AS c
		ON c.id = p.category_id`);
		let foodProd = await db.query(`
		SELECT p.id AS product_id, name, unit, price, supplier_id, quantity FROM products AS p WHERE category_id = 1` )
		let beerProd = await db.query(`
		SELECT p.id AS product_id, name, unit, price, supplier_id, quantity FROM products AS p WHERE category_id = 3`)
		let alcoholProd = await db.query(`
		SELECT p.id AS product_id, name, unit, price, supplier_id, quantity FROM products AS p WHERE category_id = 2`)
		let NABevProd = await db.query(`
		SELECT p.id AS product_id, name, unit, price, supplier_id, quantity FROM products AS p WHERE category_id = 4`)
		
		return {
			food: foodProd.rows, 
			alcohol: alcoholProd.rows, 
			beer: beerProd.rows, 
			NABev: NABevProd.rows
		}
	}

	static async getProductsBySupplier(supplierId) {
		const res = await db.query(`
		SELECT 
		p.id, p.name, p.unit, p.qty_per_unit, p.price 
		FROM products AS p
		WHERE supplier_id = $1`, [supplierId]);

		if(!res.rows) return 'error'
		return res.rows; 
	}

	static async deleteProduct(product_id) {
		const res = await db.query(
			`
		DELETE FROM products WHERE id = $1 RETURNING id, name`,
			[ product_id ]
		);
		if (!res.rows[0]) return 'error';
		return 'Successfully deleted';
	}
}

module.exports = Product;
