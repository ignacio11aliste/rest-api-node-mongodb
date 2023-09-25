/**ARCHIVO PRINCIPAL DEL MODULO */

const express = require("express");

const { ProductsController } = require("./controller");

// nos permite las rutas de nuestro modulo idependiente de nuestra aplicacion
const router = express.Router();

module.exports.ProductsAPI = (app) => {
  // definimos las rutas del modulo productos
  router
    .get("/", ProductsController.getProducts) // http://localhost:3000/api/products/
    .get("/report", ProductsController.generateReport)
    .get("/:id", ProductsController.getProduct) // para obtener productos por id http://localhost:3000/api/products/21
    .post("/", ProductsController.createProduct)
    .delete("/:id", ProductsController.deleteProducto)
    .put("/:id", ProductsController.update);

  // agregamos app a router
  app.use("/api/products", router);
};
