
const express = require("express")
const cors = require('cors')
const { NotFoundError } = require('./expressError')

const morgan = require('morgan')
const { authenticateJWT } = require('./middleware/auth')

const app = express(); 

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
app.use(authenticateJWT)
//routes
const authRoutes = require('./routes/auth')
const productRoutes = require('./routes/products')
const salesRoutes = require('./routes/sales')
const inventoryRoutes = require('./routes/inventories')
const orderRoutes = require('./routes/orders')
const menuItemRoutes = require('./routes/menuItems')
app.use('/auth', authRoutes)
app.use('/products', productRoutes)
app.use('/sales', salesRoutes)
app.use('/inventories', inventoryRoutes)
app.use('/orders', orderRoutes)
app.use('/menuItems', menuItemRoutes)
 

/** Handle 404 errors -- this matches everything */
app.use(function(req, res, next) {
	return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function(err, req, res, next) {
	if (process.env.NODE_ENV !== 'test') console.error(err.stack);
	const status = err.status || 500;
	const message = err.message;

	return res.status(status).json({
		error : { message, status }
	});
});

module.exports = app; 