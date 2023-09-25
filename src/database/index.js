// PARA LA CONEXION USAMOS EL PAQUETE DE MONGODB PARA LA CONEXION DE MONGO ATLAS
// para la conexion a la base de datos usamos el patron singleton
const { MongoClient } = require("mongodb");
const debug = require("debug")("app:modulo-database");

// traemos el archivo de configuracion desde config/index.js
const { Config } = require("../config");

var connection = null;

module.exports.Database = (collection) =>
  new Promise(async (resolve, reject) => {
    try {
      if (!connection) {
        // generamos un nuevo cliente
        const client = new MongoClient(Config.mongoUri);
        //   mongoclient nos devuelve una conexion
        connection = await client.connect();
        debug(`Nueva conexion realizada con MongoDB Atlas`);
      }
      debug(`Reutilizando conexion`);
      //   si existe una conexion nos traemos la base de datos de la conexion
      const db = connection.db(Config.mongoDbname);
      // resolver la coleccion a conectarse, la cual se pide como parametro
      resolve(db.collection(collection));
    } catch (error) {
      // regresamos el error
      reject(error);
    }
  });
