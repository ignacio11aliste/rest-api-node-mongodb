const { ObjectId } = require("mongodb");
// traimos el modulo de la base de datos
const { Database } = require("../database");

const COLLECTION = "user";

const getAll = async () => {
  const collection = await Database(COLLECTION);
  return await collection.find({}).toArray();
};

const getById = async (id) => {
  const collection = await Database(COLLECTION);
  const objectId = new ObjectId(id);
  return await collection.findOne({ _id: objectId });
};

const createUsuario = async (product) => {
  const collection = await Database(COLLECTION);
  let result = await collection.insertOne(product);
  return result.insertedId;
};

const updateUsuario = async (id, product) => {
  const collection = await Database(COLLECTION);
  const objectId = new ObjectId(id);
  await collection.updateOne({ _id: objectId }, { $set: { ...product } });
  return await getById(id);
};

const eliminarUsuario = async (id) => {
  const collection = await Database(COLLECTION);
  const objectId = new ObjectId(id);
  let deleteProduct = await collection.deleteOne({ _id: objectId });
  return [deleteProduct.deletedCount, id];
};

module.exports.UserServices = {
  getAll,
  getById,
  createUsuario,
  updateUsuario,
  eliminarUsuario,
};
