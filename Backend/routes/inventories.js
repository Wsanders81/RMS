const express = require('express');
const router = new express.Router();
const Inventory = require('../models/inventory');
const { BadRequestError } = require('../expressError');
const { ensureAdmin, ensureLoggedIn } = require('../middleware/auth');
router.post('/', async function(req, res, next) {
	try {
		const inventory = await Inventory.getInventory(req.body.id);
		if (inventory === 'error')
			throw new BadRequestError(
				`Inventory not found with date ${req.body.id}`
			);
		return res.status(200).json({ inventory });
	} catch (err) {
		return next(err);
	}
});

router.post('/all', async function(req, res, next) {
	try {
		const inventories = await Inventory.getAllInventories(req.body);
		if (inventories === 'error') {
			throw new BadRequestError(
				`No inventories found within the dates ${req.body
					.begDate} - ${req.body.endDate}`
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

router.delete('/:id', async function(req, res, next) {
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
