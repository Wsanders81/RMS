const express = require('express');
const router = new express.Router();
const { BadRequestError } = require('../expressError');
const { ensureLoggedIn, ensureAdmin } = require('../middleware/auth');
const Purchase = require('../models/purchase');
router.post('/', ensureLoggedIn, async function(req, res, next) {
	try {
		const purchase = await Purchase.addPurchases(req.body);
        if(!purchase) throw new BadRequestError("Bad Request")
		return res.json({ purchase });
	} catch (err) {
		return next(err);
	}
});

router.post('/:id', ensureLoggedIn, async function(req, res, next){
    try {
        const purchases = await Purchase.getPurchases(req.params.id)
        if(!purchases) throw new BadRequestError("no purchases with that date")
        return res.json({purchases})
    } catch(err) {
        return next(err)
    }
})

module.exports = router;
