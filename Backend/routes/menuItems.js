const express = require('express');
const router = new express.Router();
const { ensureLoggedIn, ensureAdmin } = require('../middleware/auth');
const MenuItem = require('../models/menuItem');

router.get('/:id', ensureLoggedIn, async function(req, res, next) {
	const restaurant_id = req.params.id;
	try {
		const items = await MenuItem.getAll(restaurant_id);

		return res.json({ items });
	} catch (err) {
		return next(err);
	}
});
router.get('/ingredients/:id', ensureLoggedIn, async function(req, res, next) {
	try {
		const items = await MenuItem.getMenuItemIngredients(req.params.id);
		console.log(items, 'FROM MENU INGREDIENTS');
		return res.json({ items });
	} catch (err) {
		return next(err);
	}
});

router.post('/new', ensureAdmin, async function(req, res, next) {
	try {
		console.log(req.body);
		const item = await MenuItem.createItem(req.body);
		return res.json({ item });
	} catch (err) {
		return next(err);
	}
});

router.delete('/:id', ensureAdmin, async function(req, res, next) {
	try {
		const deleteItem = await MenuItem.deleteMenuItem(req.params.id);
		if (deleteItem === 'success') {
			return res.json({ message: 'Item has been deleted' });
		}
		else return res.json({ message: 'Error, item does not exist' });
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
