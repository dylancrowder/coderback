const express = require("express");
const app = express();
app.use(express.json());

const productosRouter = require("./rutas/rutas");

app.use("/api", productosRouter);

const port = 8080;

const server = app.listen(port, () => {
  console.log(`Express escuchando en el puerto ${server.address().port}`);
});

server.on("error", (error) => {
  console.log(error);
});
