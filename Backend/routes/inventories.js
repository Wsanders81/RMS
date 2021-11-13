const express = require('express');
const router = new express.Router();
const Inventory = require('../models/inventory');
const { BadRequestError } = require('../expressError');
const { ensureAdmin, ensureLoggedIn } = require('../middleware/auth');
router.get('/', ensureLoggedIn, async function(req, res, next) {
	try {
		const inventory = await Inventory.getInventory(req.body);
		if (inventory === 'error')
			throw new BadRequestError(
				`Inventory not found with date ${req.body.date}`
			);
		return res.status(200).json({ inventory });
	} catch (err) {
		return next(err);
	}
});

router.post('/', ensureLoggedIn, async function(req, res, next) {
	try {
		const inventory = await Inventory.addInventory(req.body);
		const inventoryId = inventory.id;
		const inventoryItems = await Inventory.addInventoryItems(
			inventoryId,
			req.body
		);
		return res.status(200).json({ inventory, inventoryItems });
	} catch (err) {
		return next(err);
	}
});

router.delete('/:id', ensureAdmin, async function(req, res, next) {
	try {
		const message = await Inventory.deleteInventory(req.params.id);
		console.log(message);
		if (message === 'error')
			throw new BadRequestError(
				`Inventory with id: ${req.params.id} does not exist`
			);
		return res.status(201).json({ message });
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
