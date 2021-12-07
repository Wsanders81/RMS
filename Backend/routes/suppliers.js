const express = require('express')
const { BadRequestError } = require('../expressError')
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

router.post('/new', ensureAdmin, async function(req, res, next){
    const {name, address, phone, email, notes} = req.body.data
    try {
        const newSupplier = await Supplier.addSupplier(name, address, phone, email, notes)
        
        return res.json({newSupplier})
    } catch(err) {
        return next(err)
    }
})



module.exports = router; 