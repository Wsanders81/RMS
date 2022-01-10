const db = require('../db');
const MenuItemIngredient = require('../models/MenuItemIngredients');
class MenuItem {
	//** Get all menu items */
	static async getAll(restaurant_id) {
		const menuItems = await db.query(
			`
        SELECT * FROM menu_items WHERE restaurant_id = $1; 
        `,
			[ restaurant_id ]
		);

		return menuItems.rows;
	}
	//** Get ingredients for specific menu item */
	static async getMenuItemIngredients(id) {
		const ingredients = await db.query(
			`
        SELECT p.id, p.unit, m.quantity, p.supplier_id, p.name FROM menu_item_ingredients AS m
        JOIN products AS p
        ON m.product_id = p.id
        WHERE m.menu_item_id = $1`,
			[ id ]
		);
		return ingredients.rows;
	}

	//** Create new menu item */
	static async createItem(data) {
		//** check for dupe first */
		const check = await db.query(
			`
		SELECT FROM menu_items WHERE name = $1`,
			[ data.name ]
		);
		
		if (check.rows[0]) return 'error';
		const item = await db.query(
			`
        INSERT INTO menu_items
        (name, category_id, price)
        VALUES
        ($1, $2, $3)
        RETURNING id, name, category_id, price
        `,
			[ data.name, data.category_id, data.price ]
		);
		const itemId = item.rows[0].id;
		const ingredients = await MenuItemIngredient.addIngredients(
			data.ingredients,
			itemId
		);

		const itemReturn = item.rows[0];
		itemReturn.ingredients = ingredients;
		return itemReturn;
	}

	//** Delete Menu Item */
	static async deleteMenuItem(id) {
		const deleteItem = await db.query(
			`
		DELETE FROM menu_items
		WHERE id = $1
		RETURNING id`,
			[ id ]
		);
		if (deleteItem.rows.length) {
			return 'success';
		}
		else {
			return 'error';
		}
	}
}

module.exports = MenuItem;
