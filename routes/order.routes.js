const router = require('express').Router();
const orderController = require('../controllers/order.controller');
const { isAuth } = require('../middlewares/isAuth');

router.post('/', [isAuth], orderController.createOrder); // Create a new order

router.get('/', [isAuth], orderController.getOrders); // Get all orders



module.exports = router;