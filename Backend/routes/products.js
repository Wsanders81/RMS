const jsonschema = require('jsonschema');
const express = require('express');

const { BadRequestError } = require('../expressError');
const { ensureAdmin, ensureLoggedIn } = require('../middleware/auth');
const Product = require('../models/product');

const createProductSchema = require('../schemas/productCreate.json');

const router = new express.Router();

//** Create new product */
router.post('/',ensureAdmin,  async function(req, res, next){
    
    try {
        const validator = jsonschema.validate(req.body, createProductSchema)
        if(!validator.valid){
            const errs = validator.errors.map(e => e.stack)
            throw new BadRequestError(errs)
        }
        const product = await Product.create(req.body)
        return res.status(201).json({ product })
    } catch(err) {
        return next(err)
    }
});

//** Get all products */
router.get("/", ensureLoggedIn, async function(req, res, next){
    console.log("*********************")
    console.log(req.user)
    try {
        const products = await Product.getAllProducts()
        return res.status(200).json({ products })
    } catch(err) {
        return next(err)
    }
})

//** Delete product */
router.delete('/:productId', ensureAdmin,  async function(req, res, next){
    try {
        const message = await Product.deleteProduct(req.params.productId)
        if(message === "error") 
        {
            throw new BadRequestError("Item not found")
        }
        return res.status(200).json({ message })
    } catch(err) {
        return next(err)
    }
})

module.exports = router; 
