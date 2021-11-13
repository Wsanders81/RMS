
const express = require('express')
const router = new express.Router()
const { ensureLoggedIn, ensureAdmin } = require('../middleware/auth')
const MenuItem = require('../models/menuItem')

router.get('/', ensureLoggedIn, async function(req, res, next){
    try {
        const items = await MenuItem.getAll()
        return res.json({items}); 
    } catch(err) {
        return next(err)
    }
})

router.post('/', ensureAdmin, async function(req, res, next){
    try {
        const item = await MenuItem.createItem(req.body)
        return res.json({item})
    } catch(err) {
        return next(err)
    }
})



module.exports = router; 