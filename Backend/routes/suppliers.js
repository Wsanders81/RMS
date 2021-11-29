const express = require('express')
const router = new express.Router()
const { ensureLoggedIn, ensureAdmin } = require('../middleware/auth')
const Supplier = require('../models/supplier')
router.post('/', async function(req, res, next){
    try {
        const suppliers = await Supplier.getSuppliers()
        return res.json({suppliers})
    } catch(err) {
        return next(err)
    }
})



module.exports = router; 