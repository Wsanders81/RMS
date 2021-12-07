const db = require("../db")

class Supplier {
    
    //** Get all suppliers */
    static async getSuppliers(){
        const res = await db.query(`
        SELECT * FROM suppliers`)
        if(!res) return (404)
        return res.rows; 
    }

    static async addSupplier(name, address, phone, email, notes){
        const res = await db.query(`
        INSERT INTO suppliers(name, address, phone, email, notes)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, name, address, phone, email, notes
        `, [name, address, phone, email, notes])
        
        return res.rows[0]
    }
}

module.exports = Supplier; 