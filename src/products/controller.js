// agregamos las funciones controladoras de cada peticion  definidas en el index.js
// mediente module.exports
const createError = require("http-errors");
const debug = require("debug")("app:modulo-products-controller");

// importar services.js
const { ProductsServices } = require("./services");
const { Response } = require("../common/response");

var hex = /[0-9A-Fa-f]{6}/g;

// agregamos el services.js
module.exports.ProductsController = {
  getProducts: async (req, res) => {
    try {
      let products = await ProductsServices.getAll();
      Response.succes(res, 200, "Lista de productos", products);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },

  getProduct: async (req, res) => {
    try {
      // obtener primero el id
      const {
        params: { id },
      } = req;
      let product = await ProductsServices.getById(parseInt(id));
      if (!product) {
        Response.error(res, new createError.NotFound());
      } else {
        Response.succes(res, 200, `Producto: ${id}`, product);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },

  createProduct: async (req, res) => {
    try {
      const { body } = req;

      if (!body || Object.keys(body).length === 0) {
        Response.error(res, new createError.BadRequest());
      } else {
        const insertedId = await ProductsServices.create(body);
        Response.succes(res, 201, "Producto agregado", insertedId);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },

  // update de productos
  update: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;
      const { body } = req;
      if (!body || Object.keys(body).length === 0) {
        Response.error(res, new createError.BadRequest());
      } else {
        let product = await ProductsServices.update(id, body);
        if (!product) {
          Response.error(res, new createError.NotFound());
        } else {
          Response.succes(
            res,
            200,
            `Producto modificado correctamente`,
            product
          );
        }
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },

  // delete product
  deleteProducto: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;
      const product = await ProductsServices.getById(id);

      if (!product) {
        Response.error(res, new createError.NotFound());
      } else {
        let deleteProduct = await ProductsServices.eliminarProducto(id);
        if (deleteProduct[0] === 1) {
          Response.succes(res, 201, `Producto Eliminado ${deleteProduct[1]}`);
        }
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },

  generateReport: (req, res) => {
    try {
      ProductsServices.generateReport("Inventario", res);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
};
