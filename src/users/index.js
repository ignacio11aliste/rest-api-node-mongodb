/**ARCHIVO PRINCIPAL DEL MODULO */

const express = require("express");

const { UserController } = require("./controller");

// nos permite las rutas de nuestro modulo idependiente de nuestra aplicacion
const router = express.Router();

module.exports.UserAPI = (app) => {
  // definimos las rutas del modulo productos
  router
    .get("/", UserController.getUsers) // http://localhost:3000/api/products/
    .get("/:id", UserController.getUser) // para obtener productos por id http://localhost:3000/api/products/21
    .post("/", UserController.createUser)
    .delete("/:id", UserController.deleteUser)
    .put("/:id", UserController.updateUser);

  // agregamos app a router
  app.use("/api/users", router);
};
