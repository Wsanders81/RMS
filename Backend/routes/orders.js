
const express = require('express')
const router = new express.Router()
const { BadRequestError } = require('../expressError')
const Order = require('../models/order')
const { ensureAdmin, ensureLoggedIn } = require('../middleware/auth')
 //** Get orders within specified date */
router.get('/',ensureLoggedIn, async function(req, res, next){
    try {
        const orders = await Order.getOrdersByDate(req.body) 
        if(orders === "error") throw new BadRequestError("No orders available within specified dates")
        return res.status(200).json({ orders })
    } catch(err) {
        return next(err)
    }
})

router.post('/',ensureLoggedIn, async function(req, res, next){
    try {
        const order = await Order.createOrder(req.body)
        if(order === "error") throw new BadRequestError("")
        return res.status(201).json({ order })
    } catch(err) {
        return next(err)
    }
})

router.delete('/:id',ensureAdmin, async function(req, res, next){
    try {
        const message = await Order.deleteOrder(req.params.id)
        if(message === "error") throw new BadRequestError("Order not found")
        return res.status(201).json({ message })
    } catch(err) {
        return next(err)
    }
})


module.exports = router; 