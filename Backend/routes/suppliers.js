const express = require('express');
const { BadRequestError } = require('../expressError');
const router = new express.Router();
const { ensureLoggedIn, ensureAdmin } = require('../middleware/auth');
const Supplier = require('../models/supplier');
router.get('/:id', ensureLoggedIn, async function(req, res, next) {
	try {
		const suppliers = await Supplier.getSuppliers(req.params.id);

		return res.json({ suppliers });
	} catch (err) {
		return next(err);
	}
});

router.get('/:id', ensureLoggedIn, async function(req, res, next) {
	try {
		const supplier = await Supplier.getSupplier(req.params.id);
		return res.json({ supplier });
	} catch (err) {
		return next(err);
	}
});

router.post('/new', ensureAdmin, async function(req, res, next) {
	const { name, address, phone, email, notes } = req.body.data;
	const restaurantId = req.body.restaurantId;
	try {
		const newSupplier = await Supplier.addSupplier(
			name,
			address,
			phone,
			email,
			restaurantId,
			notes
		);

		return res.json({ newSupplier });
	} catch (err) {
		return next(err);
	}
});

router.delete('/:id', ensureAdmin, async function(req, res, next) {
	try {
		const response = await Supplier.deleteSupplier(req.params.id);
		
		return res.json({ response });
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
