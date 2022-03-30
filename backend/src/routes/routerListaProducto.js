const express = require("express");
const router = express.Router();
const db = require("../database/db");
const listaProductos = db.listaProductos;
const itemList = db.itemList;
const productos = db.productos;

router.post("/listasNombre", (req, res) => {
    listaProductos
      .create({
        nombreLista: req.body.nombreLista,
        usuarioId: req.body.usuarioId,
      })
      .then((result) => {
        res.json(result);
      });
  });

  router.delete("/listasNombre/:id", (req, res) => {
    listaProductos.destroy({
      where: {
        id:req.params.id
      }
    }).then((result) => {
      res.json(result);
    })
  });

  router.get("/listasNombre/:usuarioId", (req, res) => {
    listaProductos
      .findAll({
        where: {usuarioId: req.params.usuarioId},
          include:[
              {model:productos}
          ]
      })
      .then((result) => {
        res.json(result);
      });
  });

  router.post("/addProductos", (req, res) => {
    itemList
      .create({
        listaProductoId: req.body.listaProductoId,
        productoId: req.body.productoId,
      })
      .then((result) => {
        res.json(result);
      });
  });

  router.delete("/addProductos/:id", (req, res) => {
       itemList.destroy({
        where: {
          id:req.params.id
        }
       }).then((result) => {
        res.json(result);
      });
  })

  

  
  

module.exports = router;
