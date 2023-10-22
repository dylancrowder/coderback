const express = require("express");
const router = express.Router();
const { ProductManager } = require("./claseproduct.js");
const { v4: uuidv4 } = require("uuid");
const productos = new ProductManager();
const readProducts = productos.readProducts();

router.get("/productos", async (req, res) => {
  let limit = parseInt(req.query.limit);
  if (!limit) return res.send(await readProducts);
  let allProducts = await readProducts();
  let prodctLimit = allProducts.slice(0, limit);
  res.status(200).send(prodctLimit);
});

router.get("/productos/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let productoRequerido = await readProducts;
  let productoByID = productoRequerido.find((product) => product.id === id);
  res.status(200).send(productoByID);
});

router.post("/productos", async (req, res) => {
  const { body } = req;

  if (
    !body ||
    !body.title ||
    !body.description ||
    !body.code ||
    !body.price ||
    !body.stock ||
    !body.category
  ) {
    return res.status(400).json({
      error:
        "Se requieren campos obligatorios en el cuerpo de la solicitud.   |title | description| code |price |stock | category ",
    });
  }

  const productoAgregado = {
    ...body,
    id: uuidv4(),
    status: body.status === undefined ? true : body.status,
  };

  const products = await readProducts;
  products.push(productoAgregado);
  await productos.writeProducts(products);

  res.status(201).json(products);
});

router.put("/productos/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let productoRequerido = await readProducts;
  let productoByID = productoRequerido.find((product) => product.id === id);
  res.status(200).send(productoByID);
});

module.exports = router;
