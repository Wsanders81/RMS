const db = require('../db')
const MenuItemIngredient = require('../models/MenuItemIngredients')
class MenuItem {
    //** Get all menu items */
    static async getAll(){
        const menuItems = await db.query(`
        SELECT * FROM menu_items; 
        `)
        return menuItems.rows; 
    }

    //** Create new menu item */
    static async createItem(data){
        const item = await db.query(`
        INSERT INTO menu_items
        (name, category_id, price)
        VALUES
        ($1, $2, $3)
        RETURNING id, name, category_id, price
        `, [
            data.name, 
            data.category_id, 
            data.price
        ])
        const itemId = item.rows[0].id
        const ingredients = await MenuItemIngredient.addIngredients(data.ingredients, itemId)
        const itemReturn = item.rows[0]
        itemReturn.ingredients = ingredients
        return itemReturn
    }
}

module.exports = MenuItem