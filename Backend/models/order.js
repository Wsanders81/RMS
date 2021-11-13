const db = require('../db')

class Order {

    static async getOrdersByDate({begDate, endDate}){
        const res = await db.query(`
        SELECT 
        o.order_id, o.sales, c.category_name, m.name
        FROM orders AS o
        JOIN categories AS c
        ON o.category_id = c.id
        JOIN menu_items AS m 
        ON m.id = o.menu_item_id
        WHERE date >= $1 
        AND date <= $2
        ORDER BY o.order_id
        `, [begDate, endDate])
        let products = res.rows; 
        return products 
    }
    static async createOrder(data){
               
        const promises = data.items.map(async(item) => {
            const res = await db.query(`
            INSERT INTO orders
            (order_id, menu_item_id, sales, category_id, date)
            VALUES
            ($1, $2, $3, $4, $5)
            RETURNING 
            order_id, menu_item_id, sales, category_id, date
            `,[
                data.order_id, 
                item.menu_item_id, 
                item.sales, 
                item.category_id, 
                data.date
            ])
            return res.rows[0]
            
        })
        const orders = await Promise.all(promises)
        if(!orders.length) return "error"
        return orders; 
    }
    static async deleteOrder(id) {
        const res = await db.query(`
        DELETE FROM orders WHERE order_id = $1
        RETURNING order_id
        `, [id])
        if(res.rows[0]) return "Order successfully deleted"
        return "error"
    }
}

module.exports = Order; 