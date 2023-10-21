const express = require("express");
const app = express();
app.use(express.json());

const productosRouter = require("./rutas/products.js");

app.use("/api", productosRouter);

const port = 8080;

const server = app.listen(port, () => {
  console.log(`Express escuchando en el puerto ${server.address().port}`);
});

server.on("error", (error) => {
  console.log("este es el erro", error);
});
