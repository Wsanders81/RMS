const express = require('express');
const router = new express.Router();
const { ensureLoggedIn, ensureAdmin } = require('../middleware/auth');
const MenuItem = require('../models/menuItem');

router.post('/',  async function(req, res, next) {
	try {
		const items = await MenuItem.getAll();
		
		return res.json({ items });
	} catch (err) {
		return next(err);
	}
});
router.post('/ingredients',  async function(req, res, next) {
	try {
		const items = await MenuItem.getMenuItemIngredients(req.body.id);
		
		return res.json({ items });
	} catch (err) {
		return next(err);
	}
});

router.post('/new',  async function(req, res, next) {
	try {
		const item = await MenuItem.createItem(req.body.item);
		return res.json({ item });
	} catch (err) {
		return next(err);
	}
});

router.delete('/:id', async function(req, res, next){
    try {
        const deleteItem = await MenuItem.deleteMenuItem(req.params.id)
        if(deleteItem === 'success') {
            return res.json({message: "Item has been deleted"})
        }
        else return res.json({message: "Error, item does not exist"})
    } catch(err) {
        return next(err)
    }
})

module.exports = router;
