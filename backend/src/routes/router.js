const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../database/db');
const categorias = db.categorias;
const productos = db.productos;
const usuarios = db.usuarios;

router.get('/categorias', (req, res) => {
        categorias.findAll({
        })  .then((cate) => {
            res.json(cate);
        })          
})

router.get('/productos/:categoriaId',(req, res) => {
    productos.findAll({
        where: {categoriaId: req.params.categoriaId}
    })
    .then((cate) => {
        res.json(cate);
    })     
});

router.post('/usuarios',async (req, res) => {
    let paswo = await bcrypt.hash(req.body.password, 8);
    console.log("fun");
     usuarios.create({
         nombre: req.body.nombre,
         apellidos: req.body.apellidos,
         correo: req.body.correo,
         password: paswo
         
     })
        
      .then( ele => {
          res.json(ele);
      } )
});

module.exports = router;
