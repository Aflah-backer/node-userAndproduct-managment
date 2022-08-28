var db = require("../config/connection");
var collection = require("../config/collections");
const async = require("hbs/lib/async");
const { promise, reject } = require("bcrypt/promises");
const { response } = require("../app");
const res = require("express/lib/response");
var objectId = require("mongodb").ObjectId;
module.exports = {
  addProduct: (product, callback) => {
    console.log(product);

    db.get()
      .collection("products")
      .insertOne(product)
      .then((data) => {
        console.log(data);
        callback(data.insertedId);
      });
  },
  getAllProducts: () => {
    return new Promise(async (resolve, reject) => {
      let products = await db
        .get()
        .collection(collection.PRODUCT_COLLECTION)
        .find()
        .toArray();
      resolve(products);
    });
  },
  deleteProduct: (proId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.PRODUCT_COLLECTION)
        .deleteOne({ _id: objectId(proId) })
        .then((response) => {
          console.log(response);
          resolve(response);
        });
    });
  },
  getProductsDetails: (proId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.PRODUCT_COLLECTION)
        .findOne({ _id: objectId(proId) })
        .then((product) => {
          resolve(product);
        });
    });
  },
  updateProduct:(proId, proDetails) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.PRODUCT_COLLECTION)
        .updateOne({_id:objectId(proId) }, {
            $set:{
                Name:proDetails.Name,
                Description:proDetails.Description,
                Price:proDetails.Price,
                Category:proDetails.Category
            }
        }).then((response)=>{
            resolve()
        })
    });
  },
};
