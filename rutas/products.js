const express = require("express");
const router = express.Router();
const { ProductManager } = require("./claseproduct.js");

const productos = new ProductManager();
const readProducts = productos.readProducts();

router.get("/productos", async (req, res) => {
  let limit = parseInt(req.query.limit);
  if (!limit) return res.send(await readProducts);
  let allProducts = await readProducts;
  let prodctLimit = allProducts.slice(0, limit);
  res.send(prodctLimit);
});

router.get("/productos/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let productoRequerido = await readProducts;
  let productoByID = productoRequerido.find((product) => product.id === id);
  res.send(productoByID);
});

module.exports = router;
