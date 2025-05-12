const User = require("../models/user.model")
const bcrypt = require("bcryptjs")
const salt = 10
const jwt = require("jsonwebtoken")
const SECRET = process.env.SECRET


async function getUsers(req, res) {
    try {

        // const searchName = new RegExp(req.query.name, "i") // i = case insensitive

        // const users = await User.find({
        //     $or: [ 
        //         {name: searchName},
        //         { role: "admin"}
        //     ]
        // })

        const users = await User.find({})
            .select({ password: 0, __v: 0 })
            .sort({ name: 1 }) // Ordenar por nombre de forma ascendente
            .collation({ locale: "es" }) // Para que ordene por acentos y caracteres especiales
        // .limit(10) // Limitar a 10 resultados
        // .skip(0) // Saltar los primeros 0 resultados (paginación)

        res.status(200).send(users)


    } catch (error) {
        console.log(error)
        res.status(500).send("Error al obtener usuarios")
    }
}

function getUsersByID(req, res) {
    console.log("Pet recibida al controler")

    res.send("Obtener usuarios")
}

//#Creacion de usuario

async function createUser(req, res) {
    try {
        req.body.role = "admin"
        
        const user = new User(req.body)

        user.role = "user"

        // si hay imagen, la agregás (pero no es obligatoria)
        if (req.file) {
            user.image = `users/${req.file.filename}`
        }

        // Validación: asegurarse de que haya una contraseña
        if (!user.password) {
            return res.status(400).send({ error: "La contraseña es requerida." })
        }

        //Antes de guardar el usuario, encriptamos la contraseña.
        user.password = await bcrypt.hash(user.password, salt)

        const newUser = await user.save()


        //Antes de devolver el ususario, eliminamos la contraseña. 
        newUser.password = undefined

        res.status(201).send({
            message: "Usuario creado correctamente",
            user: newUser
        })

    } catch (error) {
        console.log("Error al crear usuario", error)
        res.status(500).send("Error al crear usuario", error)
    }
}

//#Obtener usuario por ID

async function getUsersByID(req, res) {

    try {
        const id = req.params.id

        const user = await User.findById(id).select({ password: 0, __v: 0 })

        if (!user) {
            return res.status(404).send({
                message: "Usuario no encontrado"
            })
        }

        //user.country = undefined


        res.status(200).send({
            message: "Se obtuvo el usuario correctamente",
            user
        })

    } catch (error) {
        console.log("Error al obtener usuario por ID", error)
        res.status(500).send({
            message: "Error al obtener usuario por ID"
        })
    }
    console.log("Pet recibida al controler")

    res.send("Obtener usuarios por ID")
}

//Eliminar usuario por ID

async function deleteUserByID(req, res) {
    try {

        const id = req.params.id
        const userDeleted = await User.findByIdAndDelete(id)

        if (!userDeleted) {
            return res.status(404).send({
                message: "No se pudo eliminar el usuario"
            })
        }

        return res.status(200).send({
            message: `El usuario con ID ${id}, ${userDeleted.name} fue eliminado correctamente`
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Error al eliminar usuario"
        })

    }
}

//Actualizar usuario por ID

async function updateUserByID(req, res) {

    try {
        const id = req.params.id
        const data = req.body

        data.password = undefined
        data.updatedAt = Date.now()

        const userUpdated = await User.findByIdAndUpdate(id, data, { new: true })

        console.log(userUpdated)

        if (!userUpdated) {
            return res.status(404).send({
                message: "No se pudo actualizar el usuario"
            })
        }

        return res.status(200).send({
            message: "Usuario actualizado correctamente",
            user: userUpdated
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Error al actualizar usuario por ID"
        })

    }

}

async function loginUser(req, res) {
    try {

        console.log(req.body)
        //1- vamos a recibir desde la app del front un email y un password.
        const { email, password } = req.body
        //1.b- si no llega el email o la contraseña, devolvemos un error 400.
        if (!email || !password) {
            return res.status(400).send({
                message: "Email y contraseña son requeridos"
            })
        }

        //2- vamos a buscar en nuestra DB si existe un usuario con ese email:
        const user = await User.findOne({ email })

        //a- si no existe el usuario, entonces devolvemos un error 404.
        if (!user) {
            return res.status(404).send({
                message: "Credenciales incorrectas"
            })
        }
        //b- si existe el usuario, pasamos al punto 3.
        // 3- Comparamos la contraseña que nos mandaron con la que tenemos en la DB.
        const isVerified = await bcrypt.compare(password, user.password)

        //a- si no coinciden devolvemos un error 401.
        if (!isVerified) {
            return res.status(401).send({
                message: "Credenciales incorrectas"
            })
        }
        user.password = undefined

        //b- vamos a establecer o generar un token para que el usuario pueda verificar que es el mismo usuario que se logueo.
        // Los token se utilizan para autenticar al usuario en el sistema. En este caso, vamos a utilizar JWT (JSON Web Token).
        const token = jwt.sign(
            {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            SECRET,
            { expiresIn: "7d" }
        )


        //4- Devolvemos el token y el usuario sin la contraseña.
        return res.status(200).send({
            message: "Usuario logueado correctamente",
            user,
            token
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Error al iniciar sesión"
        })
    }
}



module.exports = {
    getUsers,
    getUsersByID,
    createUser,
    deleteUserByID,
    updateUserByID,
    loginUser
}