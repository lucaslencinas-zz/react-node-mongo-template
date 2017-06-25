const MongoClient = require('mongodb').MongoClient;

let db;

function connect(url) {
  return MongoClient.connect(url)
    .then((dbObject) => (db = dbObject));
}

function insert(entity, collectionName) {
  const collection = db.collection(collectionName);
  if (Array.isArray(entity)) {
    return collection.insertMany(entity);
  }
  return collection.insertOne(entity);
}

function find(query, fields, collectionName) {
  return db.collection(collectionName).findOne(query, { fields });
}

function search(query, fields, collectionName) {
  return db.collection(collectionName).find(query, { fields }).toArray();
}

function remove(filter, collectionName) {
  return db.collection(collectionName).deleteMany(filter);
}

function update(selector, updatedEntity, collectionName) {
  // eslint-disable-next-line
  delete updatedEntity._id;
  return db.collection(collectionName).updateOne(selector, { $set: updatedEntity });
}

module.exports = {
  connect,
  insert,
  find,
  search,
  remove,
  update
};
