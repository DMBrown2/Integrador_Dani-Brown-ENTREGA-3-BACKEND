// const express = require("express")
// const router = express.Router()

const router = require("express").Router()
const productController = require("../controllers/product.controller")
const upload = require('../middlewares/uploadFile')

//Ruta pra obtener todos los productos.
router.get("/", productController.getProducts)  

//Ruta para obtener un producto por su ID.
router.get("/:id", productController.getProductsByID)

//Ruta para crear un nuevo producto.
router.post("/", [upload], productController.createProduct)

//Ruta para eliminar un producto por su ID.
router.delete("/:id", productController.deleteProductByID)

//Ruta para ACTUALIZAR un producto por su ID.
router.put("/:id", [upload], productController.updateProductByID)



//Exportar el router para usar en otros archivos.
module.exports = router