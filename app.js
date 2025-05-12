const express = require('express')
const cors = require('cors')

const routes = require('./routes/index.js')

const app = express()
console.log("Iniciando el servidor")

//Configuracion del puerto
//Middleware para majenjar el body de la peticion
app.use( express.json() )

//Leer archivos carpeta publica uploads
app.use( express.static('uploads') )

app.use( express.urlencoded({ extended: true }) )

//Habilitamos los CORS para permitir el acceso a la API desde otros dominios.
app.use( cors() )


app.use("/api", routes)


module.exports = app