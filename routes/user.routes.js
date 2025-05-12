const router = require("express").Router()
const userController = require("../controllers/user.controller")
const {isAuth, isAdmin} = require("../middlewares/isAuth")

//Ruta para obtener todos los usuarios.
router.get("/", userController.getUsers)

//Ruta para crear un nuevo usuario.
router.post("/", userController.createUser)

//Ruta para obtener un usuario por su ID.
router.get("/:id{/:otro}", userController.getUsersByID)

//Ruta para eliminar un usuario por su ID.
router.delete("/:id", userController.deleteUserByID)

//Ruta para ACTUALIZAR un usuario por su ID.
router.put("/:id", [isAuth, isAdmin], userController.updateUserByID)


//Ruta para realizar un login de usuario.
router.post("/login", userController.loginUser)

//Ruta para modidica la contraseña de un usuario.


module.exports = router