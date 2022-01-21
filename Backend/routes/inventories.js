const express = require('express');
const router = new express.Router();
const Inventory = require('../models/inventory');
const { BadRequestError } = require('../expressError');
const { ensureAdmin, ensureLoggedIn } = require('../middleware/auth');
router.get('/:id', ensureLoggedIn, async function(req, res, next) {
	try {
		const inventory = await Inventory.getInventory(req.params.id);
		if (inventory === 'error')
			throw new BadRequestError(
				`Inventory not found with date ${req.params.id}`
			);
		return res.status(200).json({ inventory });
	} catch (err) {
		return next(err);
	}
});

router.get('/all/:begDate/:endDate/:id',ensureLoggedIn , async function(req, res, next) {
	try {
		const inventoryObj = {
			begDate       : req.params.begDate,
			endDate       : req.params.endDate,
			restaurant_id : req.params.id
		};
		const inventories = await Inventory.getAllInventories(inventoryObj);
		if (inventories === 'error') {
			throw new BadRequestError(
				`No inventories found within the dates ${req.params
					.begDate} - ${req.params.endDate}`
			);
		}

		return res.json(inventories);
	} catch (err) {
		return next(err);
	}
});

router.post('/add', async function(req, res, next) {
	try {
		const inventory = await Inventory.addInventory(req.body);
		if (inventory.message) return res.json({ message: inventory.message });
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
