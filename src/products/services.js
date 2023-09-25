const { ObjectId } = require("mongodb");
// traimos el modulo de la base de datos
const { Database } = require("../database");
const { ProductUtils } = require("./utils");

const COLLECTION = "products";
// para traer todos los productos
const getAll = async () => {
  const collection = await Database(COLLECTION);
  return await collection.find({}).toArray();
};

// busquedas en base a un id
const getById = async (id) => {
  const collection = await Database(COLLECTION);
  const objectId = new ObjectId(id);
  return await collection.findOne({ _id: objectId });
};
// para crear productos
const create = async (product) => {
  const collection = await Database(COLLECTION);
  let result = await collection.insertOne(product);
  return result.insertedId;
};

// actualizar producto
const update = async (id, product) => {
  const collection = await Database(COLLECTION);
  const objectId = new ObjectId(id);
  await collection.updateOne({ _id: objectId }, { $set: { ...product } });
  return await getById(id);
};

const eliminarProducto = async (id) => {
  const collection = await Database(COLLECTION);
  const objectId = new ObjectId(id);
  let deleteProduct = await collection.deleteOne({ _id: objectId });
  return [deleteProduct.deletedCount, id];
};

// para el excel
const generateReport = async (name, res) => {
  let products = await getAll();
  ProductUtils.excelGenerator(products, name, res);
};

module.exports.ProductsServices = {
  getAll,
  getById,
  create,
  generateReport,
  update,
  eliminarProducto,
};
