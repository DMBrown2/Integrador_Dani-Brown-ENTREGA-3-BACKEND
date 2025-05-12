const Order = require('../models/order.model.js');
const Product = require('../models/product.model.js'); // Assuming you have a Product model


async function createOrder(req, res) {
  // Logic to create an order
 try {
    const data = req.body;
    const order = new Order(data);
    // const token = req.headers.access_token;


   await checkOrderPrices(order.products)


    const newOrder = await order.save();
    return res.status(201).send({ 
        message: 'Order created successfully', 
        order: newOrder
    })
 } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'Error creating order' })
 }
}

async function checkOrderPrices(products) {
for(const product of products) {
   const productDB = await Product.findById(product.product)

   if(!productDB) {
       throw new Error(`Product with ID ${product.product} not found`)
   }
   if(productDB.price !== product.price) {
       throw new Error(`Price mismatch for product with ID ${product.product}`)
   }
}
}

async function getOrders(req, res) {
    try {

        const id = req.user._id // Assuming you have the user ID in the request object

        const user = req.user.role === 'admin' ? {} : { user: id } // If the user is an admin, fetch all orders, otherwise fetch orders for the specific user

        const orders = await Order.find(user)
        .sort({ createdAt: -1 })
        .populate('user', 'name email') // Populate the user field with name and email
        .populate("products.product", "name image") // Populate the product field with name, and image

        return res.status(200).send({
            message: 'Orders fetched successfully',
            orders
        })
      
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error fetching orders', error });
    }
}

module.exports = {
    createOrder,
    // Add other order-related functions here (e.g., getOrders, updateOrder, deleteOrder)
    getOrders,
};