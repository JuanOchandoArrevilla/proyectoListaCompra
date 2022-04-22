const express = require("express");
const router = express.Router();
const db = require("../database/db");
const usuarios = db.usuarios;
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');

router.post("/usuarios", async (req, res) => {
    let passwordHash = await bcrypt.hash(req.body.password, 8);
    usuarios
      .create({
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        correo: req.body.correo,
        password: passwordHash,
      })
      .then((result) => {
        res.json(result);
      });
  });

// router.post('/login',async (req, res) => {

//   const user = await usuarios.findOne( { correo: req.body.correo })
//   const passwordCorrect = user === null ? false
//   : await bcrypt.compare(req.body.password,user.password)


//   if (!(user && passwordCorrect)) {
//     return res.status(401).json({
//       error: 'invalid username or password'
//     })
//   }

//   const userForToken = {
//     correo: user.correo,
//     id: user._id,
//   }

//   const token = jwt.sign(userForToken, process.env.SECRET)
//   res
//   .status(200)
//   .send({ token, username: user.username, name: user.name })
// })

router.post('/login',async (req, res) => {

  const user = await usuarios.findOne({ correo: req.body.correo })
  
   let compare = await bcrypt.compare(req.body.password,user.password);
    if (compare) {
      res.json("correcto");
    } else {
      res.json("no");
    }

 
})


module.exports = router;
