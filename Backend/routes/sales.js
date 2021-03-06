const Sales = require('../models/sale');
const express = require('express');
const router = new express.Router();
const { BadRequestError } = require('../expressError');
const { ensureAdmin, ensureLoggedIn } = require('../middleware/auth');
router.get('/:begDate/:endDate/:restaurant_id', ensureLoggedIn, async function(
	req,
	res,
	next
) {
	try {
		const sales = await Sales.getSales(req.params);
		if (sales === 500) {
			throw new BadRequestError('Invalid request');
		}
		return res.status(200).json({ sales });
	} catch (err) {
		return next(err);
	}
});

router.post('/add', ensureAdmin, async function(req, res, next) {
	try {
		const sales = await Sales.addSales(req.body);
		
		return res.json({ sales });
	} catch (err) {
		return next(err);
	}
});

router.delete('/:id',ensureAdmin,  async function(req, res, next) {
	try {
		const message = await Sales.removeSales(req.params.id);
		if (message === 'error') {
			throw new BadRequestError(
				`Sales records do not exist with id ${req.params.id}`
			);
		}
		return res.status(200).json({ message });
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
