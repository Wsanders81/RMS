const db = require('../db');

class Sale {
	//** GET sales within specified dates */
	static async getSales({ begDate, endDate, restaurantId }) {
		
		const res = await db.query(
			`
        SELECT s.id, s.date, s.sales, c.category_name FROM sales AS s
        JOIN categories AS c
        ON s.category_id = c.id 
        WHERE date >= $1 
        AND date <= $2
        AND restaurant_id = $3
        ORDER BY s.date, c.category_name`,
			[ begDate, endDate, restaurantId ]
		);
		if (!res) return 500;

		return res.rows;
	}

	//** Add sales */
	static async addSales({ date, categoryId, sales }) {
		//** check if sales already exist for that day */
		const dateObject = {
			begDate : date,
			endDate : date
		};
		const check = await this.getSales(dateObject);

		if (check.length > 1)
			return { error: 'Sales already exist for that day' };
		const res = await db.query(
			`
        INSERT INTO sales(date, category_id, sales)
        VALUES ($1, $2, $3)
        RETURNING id, date, category_id, sales`,
			[ date, categoryId, sales ]
		);
		// return res.rows[0];
		return res.rows[0];
	}

	//** delete sales */
	static async removeSales(id) {
		const res = await db.query(
			`
        DELETE FROM sales WHERE 
        id = $1 RETURNING id, date, sales`,
			[ id ]
		);
		if (!res.rows[0]) return 'error';
		return 'Successfully deleted';
	}
}

module.exports = Sale;
