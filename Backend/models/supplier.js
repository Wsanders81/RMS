const db = require('../db');

class Supplier {
	//** Get all suppliers */
	static async getSuppliers() {
		const res = await db.query(`
        SELECT * FROM suppliers`);
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
	static async addSupplier(name, address, phone, email, notes) {
		const res = await db.query(
			`
        INSERT INTO suppliers(name, address, phone, email, notes)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, name, address, phone, email, notes
        `,
			[ name, address, phone, email, notes ]
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
