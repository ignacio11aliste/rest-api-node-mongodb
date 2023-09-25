// agregamos las funciones controladoras de cada peticion  definidas en el index.js
// mediente module.exports
const createError = require("http-errors");
const debug = require("debug")("app:modulo-user-controller");

// importar services.js
const { UserServices } = require("./services");
const { Response } = require("../common/response");

// agregamos el services.js
module.exports.UserController = {
  getUsers: async (req, res) => {
    try {
      let users = await UserServices.getAll();
      Response.succes(res, 200, "Lista de usuarios", users);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },

  getUser: async (req, res) => {
    try {
      // obtener primero el id
      const {
        params: { id },
      } = req;
      let user = await UserServices.getById(id);
      if (!user) {
        Response.error(res, new createError.NotFound());
      } else {
        Response.succes(res, 200, `Usuario: ${id}`, user);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },

  createUser: async (req, res) => {
    try {
      const { body } = req;

      if (!body || Object.keys(body).length === 0) {
        Response.error(res, new createError.BadRequest());
      } else {
        const insertedId = await UserServices.createUsuario(body);
        Response.succes(res, 201, "Usuario creado correctamente", insertedId);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },

  // update de productos
  updateUser: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;
      const { body } = req;
      if (!body || Object.keys(body).length === 0) {
        Response.error(res, new createError.BadRequest());
      } else {
        let updateUsuario = await UserServices.updateUsuario(id, body);
        if (!updateUsuario) {
          Response.error(res, new createError.NotFound());
        } else {
          Response.succes(
            res,
            200,
            `Usuario actualizado correctamente`,
            updateUsuario
          );
        }
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },

  // delete product
  deleteUser: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;
      const user = await UserServices.getById(id);

      if (!user) {
        Response.error(res, new createError.NotFound());
      } else {
        let deleteUsusario = await UserServices.eliminarUsuario(id);
        if (deleteUsusario[0] === 1) {
          Response.succes(res, 201, `Producto Eliminado ${deleteUsusario[1]}`);
        }
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
};
