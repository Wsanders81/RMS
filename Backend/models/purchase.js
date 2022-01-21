const db = require('../db');

class Purchase {
	//** Add purchases with Inventory ID */
	static async addPurchases(data) {
		const res = await db.query(
			`
        INSERT INTO purchases
        (inventory_id, category_id, amount)
        VALUES($1, $2, $3)
        RETURNING inventory_id, category_id, amount`,
			[ data.inventory_id, data.category_id, data.amount ]
		);

		return res.rows[0];
	}

	//** Get purchases with Inventory ID */
	static async getPurchases(id) {
		const res = await db.query(
			`
        SELECT * FROM purchases
        WHERE inventory_id = $1`,
			[ id ]
		);
		return res.rows;
	}
}

module.exports = Purchase;
