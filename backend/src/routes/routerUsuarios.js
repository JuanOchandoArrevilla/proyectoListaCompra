const express = require("express");
const router = express.Router();
const db = require("../database/db");
const usuarios = db.usuarios;
const bcrypt = require("bcryptjs")

router.post("/usuarios", async (req, res) => {
    let paswo = await bcrypt.hash(req.body.password, 8);
    usuarios
      .create({
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        correo: req.body.correo,
        password: paswo,
      })
      .then((result) => {
        res.json(result);
      });
  });

module.exports = router;
