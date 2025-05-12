const Product = require("../models/product.model")

async function createProduct(req, res) {
  try {
    const product = new Product(req.body)

    if (req.file) {
      product.image = req.file.filename 
    }

    const newProduct = await product.save()

    return res.status(201).send({
      message: "Producto creado con éxito",
      product: newProduct
    })
  } catch (error) {
    console.error("Error al crear producto:", error)
    res.status(500).send("Error creando producto")
  }
}

//Obtener todos los productos.
async function getProducts(req, res) {
  try {
    const page = req.query.page - 1 || 0
    const limit = req.query.limit || 8

    const products = await Product.find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(page * limit)

    return res.status(200).send({
      message: "Productos obtenidos con éxito",
      products: products
    })
  } catch (error) {
    console.error("Error al obtener productos:", error)
    res.status(500).send("Error obteniendo productos")
  }
}

async function getProductsByID(req, res) {
  try {
    const productId = req.params.id
    const product = await Product.findById(productId)

    if (!product) {
      return res.status(404).send({ message: "Producto no encontrado" })
    }

    res.status(200).send({ product })
    
  } catch (error) {
    console.error("Error al obtener producto por ID:", error);
    res.status(500).send({ message: "Error obteniendo producto" });
  }
}

async function deleteProductByID(req, res) {
    try {
        const productId = req.params.id
        await Product.findByIdAndDelete(productId);
        res.send(`Producto con ID: ${productId} eliminado`)
        
    } catch (error) {
        console.error("Error al eliminar producto:", error)
        res.status(500).send("Error eliminando producto")
        
    }
}

async function updateProductByID(req, res) {
  try {
    const productId = req.params.id;
    const data = req.body;

    if (req.file) {
      data.image = req.file.filename;
    } else {
  // Si no llega nueva imagen, extraé solo el filename
  const existingProduct = await Product.findById(productId);
  const img = existingProduct.image || "";
  // Si contiene ‘/’, toma lo que viene después:
  data.image = img.includes("/") ? img.split("/").pop() : img;
}

    const updatedProduct = await Product.findByIdAndUpdate(productId, data, {
      new: true, // devuelve el producto actualizado
    });

    if (!updatedProduct) {
      return res.status(404).send({ message: "Producto no encontrado" });
    }

    res.status(200).send({
      message: "Producto actualizado correctamente",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).send("Error actualizando producto");
  }
}

module.exports = {
  getProducts,
  getProductsByID,
  createProduct,
  deleteProductByID,
  updateProductByID
}
