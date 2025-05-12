const express = require('express');
const router = express.Router();

const product_router = require('./product.routes');
const user_router = require('./user.routes');
const category_router = require('./category.routes');
const order_router = require('./order.routes');

router.use('/products', product_router);
router.use('/users', user_router);
router.use('/categories', category_router);
router.use('/orders', order_router);

module.exports = router;
