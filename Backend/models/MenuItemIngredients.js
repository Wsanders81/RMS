const db = require('../db')

class MenuItemIngredient {
    static async addIngredients(ingredients, itemId){
        const ings = ingredients.map(async(ing) => {
            const res = await db.query(`
            INSERT INTO menu_item_ingredients
            (menu_item_id, product_id, quantity)
            VALUES
            ($1, $2, $3)
            RETURNING menu_item_id, product_id, quantity
            `, [
                itemId, 
                ing.product_id, 
                ing.quantity
            ])
            return res.rows[0]
        })
        const allIngs = await Promise.all(ings)
        return allIngs;  
    }
}

module.exports = MenuItemIngredient; 