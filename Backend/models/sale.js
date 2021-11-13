const db = require('../db')

class Sale {
    //** GET sales within specified dates */
    static async getSales({begDate, endDate}){
        const res = await db.query(`
        SELECT * FROM sales 
        WHERE date >= $1 
        AND date <= $2`,  
        [begDate, endDate]); 
        if(!res) return (500); 
        return res.rows; 
    }


    //** Add sales */
    static async addSales({date, categoryId, sales}){
        const res = await db.query(`
        INSERT INTO sales(date, category_id, sales)
        VALUES ($1, $2, $3)
        RETURNING id, date, category_id, sales`, 
        [date, categoryId, sales])
        console.log(res.rows[0])
        return res.rows[0]; 
    }

    //** delete sales */
    static async removeSales(id){
        const res = await db.query(`
        DELETE FROM sales WHERE 
        id = $1 RETURNING id, date, sales`, 
        [id])
        if(!res.rows[0]) return ("error")
        return ("Successfully deleted")

    }
}

module.exports = Sale; 