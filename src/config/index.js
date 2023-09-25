/**  dontenv nos ayuda a trer todas las variables que esten en el 
     en el archivo .env    
*/
require("dotenv").config();

module.exports.Config = {
  port: process.env.PORT,
  mongoUri: process.env.MONGO_URI,
  mongoDbname: process.env.MONGO_DBNAME,
};
