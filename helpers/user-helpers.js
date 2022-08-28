var db = require("../config/connection");
var collection = require("../config/collections");
const bcrypt = require("bcrypt");
const { promise, reject } = require("bcrypt/promises");
const async = require("hbs/lib/async");
const { response } = require("express");
var objectId = require("mongodb").ObjectId;
module.exports = {
  doSignup: (userData) => {
    return new Promise(async (resolve, reject) => {
      userData.password = await bcrypt.hash(userData.password, 10);
      db.get()
        .collection(collection.USER_COLLECTION)
        .insertOne(userData)
        .then((data) => {
          resolve(data.insertedId);
        });
    });
  },
  doLogin: (userData) => {
    return new Promise(async (resolve, reject) => {
      let loginStatus = false;
      let user = await db
        .get()
        .collection(collection.USER_COLLECTION)
        .findOne({ email: userData.email });
      if (user) {
        bcrypt.compare(userData.password, user.password).then((status) => {
          if (status) {
            // console.log("login success");
            response.user = user;
            response.status = true;
            resolve(response);
          } else {
            // console.log("login failed");
            resolve({ status: false });
          }
        });
      } else {
        // console.log("login failed");
        resolve({ status: false });
      }
    });
  },
  addUser: (user, callback) => {
    console.log(user);

    db.get()
      .collection("user")
      .insertOne(user)
      .then((data) => {
        console.log(data);
        callback(data.insertedId);
      });
  },
  getAllUser: () => {
    return new Promise(async (resolve, reject) => {
      let user = await db
        .get()
        .collection(collection.USER_COLLECTION)
        .find()
        .toArray();
      resolve(user);
    });
  },
  deleteUser: (useId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.USER_COLLECTION)
        .deleteOne({ _id: objectId(useId) })
        .then((response) => {
          console.log(response);
          resolve(response);
        });
    });
  },
  getuserDetails: (useId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.USER_COLLECTION)
        .findOne({ _id: objectId(useId) })
        .then((user) => {
          resolve(user);
        });
    });
  },
  updateUser: (useId, userDetails) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.USER_COLLECTION)
        .updateOne(
          { _id: objectId(useId) },
          {
            $set: {
              Name: userDetails.Name,
              Email: userDetails.Email
            },
          }
        )
        .then((response) => {
          resolve();
        });
    });
  },
};
