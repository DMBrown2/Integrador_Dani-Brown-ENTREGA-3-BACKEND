const router = require('express').Router();
const categoryController = require('../controllers/category.controller')

//Obtener todas las categorias.
router.get('/categories', categoryController.getCategories)

//Crear una nueva categoria.
router.post('/categories', categoryController.createCategory)

module.exports = router