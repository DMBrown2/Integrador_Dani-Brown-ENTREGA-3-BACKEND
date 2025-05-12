const jwt = require("jsonwebtoken")
require("dotenv").config()
const SECRET = process.env.SECRET

function isAuth(req, res, next) {
  // const token = req.headers.authorization.split(" ")[1] || req.headers.authorization
 
  let token = req.headers.authorization 

  if (token?.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }

  if (!token) {
    return res.status(401).send("No tenes acceso a esta ruta")
  }

  console.log("👉 Token recibido:", token);
  console.log("🔐 SECRET usado:", SECRET);
  

  jwt.verify(token, SECRET, (error, decoded) => {
    if (error) {
      console.log("❌ Error verificando el token:", error.message)
      return res.status(401).send({ error: "Token invalido" })
    }
    
    console.log("Token verificado", decoded)

    req.user = decoded
    next()
    
  })

}

function isAdmin(req, res, next) {
  const token = req.headers.access_token

  if (!token) {
    return res.status(401).send("No tenes acceso a esta ruta")
  }

  console.log(SECRET)

  jwt.verify(token, SECRET, (error, decoded) => {
    if (error) {
      return res.status(401).send({ error: "Token invalido" })
    }

    req.user = decoded

    if (decoded.role !== "admin") {
      return res.status(403).send({ error: "No tenes permisos para acceder a esta ruta" })
    }

    next()
  })
}

module.exports = { isAuth, isAdmin }
