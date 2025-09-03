require("dotenv").config()

const app = require("./app.js")
const mongoose = require("mongoose")

const PORT = 4000

const URI = process.env.MONGO_URI 


mongoose.connect(URI)
            .then(() => {
                console.log("Conectado a la base de datos (DB). Prueba de conexión exitosa.")

                app.listen(PORT, () => {
                    console.log(`Servidor funcionando en el puerto ${PORT}`)
                })

            })
            .catch((err) => {
                console.log("error al conectar a la db",err)
            })


