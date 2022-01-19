const db = require('../db');
const { BadRequestError } = require('../expressError');

class Supplier {
	//** Get all suppliers */
	static async getSuppliers(restaurant_id) {
		const res = await db.query(
			`
        SELECT * FROM suppliers WHERE restaurant_id = $1`,
			[ restaurant_id ]
		);
		if (!res) return 404;
		return res.rows;
	}
	//** Get single supplier */
	static async getSupplier(id) {
		const res = await db.query(
			`
        SELECT * FROM suppliers WHERE id = $1`,
			[ id ]
		);
		return res.rows[0];
	}

	//** Add new supplier */
	static async addSupplier(
		name,
		address,
		phone,
		email,
		restaurant_id,
		notes
	) {
		
		const dupeCheck = await db.query(
			`SELECT * FROM suppliers WHERE name = $1
		`,
			[ name ]
		);
		
		if (dupeCheck.rows[0]) {
			throw new BadRequestError('Duplicate Supplier');
		}
		const res = await db.query(
			`
        INSERT INTO suppliers(name, address, phone, email, restaurant_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, name, address, phone, email, restaurant_id
        `,
			[ name, address, phone, email, restaurant_id ]
		);

		return res.rows[0];
	}
	//** Delete supplier with given id */
	static async deleteSupplier(id) {
		const res = await db.query(
			`
        DELETE FROM suppliers WHERE id = $1
        RETURNING id`,
			[ id ]
		);
		return res.rows[0];
	}
}

module.exports = Supplier;
