var db = require("../config/connection");
var collection = require("../config/collections");
const bcrypt = require("bcrypt");
const { promise, reject } = require("bcrypt/promises");
const async = require("hbs/lib/async");
const { response } = require("express");


module.exports = {

doLogin: (userData) => {
    return new Promise(async (resolve, reject) => {
      let loginStatus = false;
      let admin2 = await db
        .get()
        .collection(collection.USER_COLLECTION)
        .findOne({ email: userData.email });
      if (admin2) {
        bcrypt.compare(userData.password, user.password).then((status) => {
          if (status) {
            console.log("login success");
            response.user = user;
            response.status = true;
            resolve(response);
          } else {
            console.log("login failed");
            resolve({ status: false });
          }
        });
      } else {
        console.log("login failed");
        resolve({ status: false });
      }
    });
  }
}