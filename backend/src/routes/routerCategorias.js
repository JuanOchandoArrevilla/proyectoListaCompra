const express = require("express");
const router = express.Router();
const db = require("../database/db");
const categorias = db.categorias;

router.get("/categorias", (req, res) => {
    categorias.findAll({})
    .then((result) => {
      res.json(result);
    });
  });


module.exports = router;