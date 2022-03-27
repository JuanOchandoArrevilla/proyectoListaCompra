const express = require('express');
const router = express.Router();
const db = require('../database/db');
const categorias = db.categorias;
const productos = db.productos;

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

module.exports =router;
