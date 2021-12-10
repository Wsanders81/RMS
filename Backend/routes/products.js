const jsonschema = require('jsonschema');
const express = require('express');

const { BadRequestError } = require('../expressError');
const { ensureAdmin, ensureLoggedIn } = require('../middleware/auth');
const Product = require('../models/product');

const createProductSchema = require('../schemas/productCreate.json');

const router = new express.Router();

//** Create new product */
router.post('/', async function(req, res, next) {
	const {
		name,
		unit,
		supplier_id,
		category_id
	} = req.body.data;
    const price = parseInt(req.body.data.price)
    const quantity_per_unit = parseInt(req.body.data.quantity_per_unit)
	
	try {
		
		const product = await Product.create(name, unit, quantity_per_unit, price, supplier_id, category_id);
		return res.status(201).json({ product });
	} catch (err) {
		return next(err);
	}
});

//** Get all products */
router.post('/all',  async function(req, res, next) {
	try {
		const products = await Product.getAllProducts();
		return res.status(200).json({ products });
	} catch (err) {
		return next(err);
	}
});

router.post('/:supplier_id', async function(req, res, next) {
	try {
		const products = await Product.getProductsBySupplier(
			req.params.supplier_id
		);
		return res.json({ products });
	} catch (err) {
		return next(err);
	}
});

//** Delete product */
router.delete('/:productId', async function(req, res, next) {
	try {
		const message = await Product.deleteProduct(req.params.productId);
		if (message === 'error') {
			throw new BadRequestError('Item not found');
		}
		return res.status(200).json({ message });
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
