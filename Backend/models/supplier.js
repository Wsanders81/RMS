const db = require("../db")

class Supplier {
    
    //** Get all suppliers */
    static async getSuppliers(){
        const res = await db.query(`
        SELECT * FROM suppliers`)
        if(!res) return (404)
        return res.rows; 
    }
}

module.exports = Supplier; 