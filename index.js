// requerimos express
const express = require("express");
// requerimos debug
const debug = require("debug")("app:main");

const { Config } = require("./src/config");
const { ProductsAPI } = require("./src/products");
const { UserAPI } = require("./src/users");

const app = express();

// agregamos la capacidad de recibir datos en el request.body
app.use(express.json());

// modulos
ProductsAPI(app);
UserAPI(app);

// hacemos que la aplicacion escuche las peticiones
app.listen(Config.port, () => {
  debug(`Servidor escuchando en el puerto ${Config.port}`);
});
