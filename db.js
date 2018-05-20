const mongoose = require("mongoose"),
      CONFIG = require("./dbConfig.js"),
      Customer = require("./schemas/customerSchema.js");


mongoose.Promise = global.Promise;

const options = { 
    autoIndex: false,
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 1000, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
  };
const db = mongoose.connect(CONFIG.URI, options).then(console.log('Mongo DB works fine'));

const customer = {
    create: (userID, name, encryptedAddress, callback) => {
        Customer.create({userID: userID, name: name, encryptedAddress: encryptedAddress}, (err, res) => {
            if (err) {
                console.log(err);
                callback(err, null);
            } else {
                callback(null, res);
            }
        });
    },
    find: {
        byName: (name, callback) => {
            Customer.find({name: name}, (err, res) => {
                if (err) {
                    console.log(err);
                    callback(err, null);
                } else {
                    callback(null, res[0]);
                }
            });
        },
        byUserID: (userID, callback) => {
            Customer.find({userID: userID}, (err, res) => {
                if (err) {
                    console.log(err);
                    callback(err, null);
                } else {
                    callback(null, res[0]);
                }
            });
        },
        byEncryptedAddress: (encryptedAddress, callback) => {
            Customer.find({encryptedAddress: encryptedAddress}, (err, res) => {
                if (err) {
                    console.log(err);
                    callback(err, null);
                } else {
                    callback(null, res[0]);
                }
            });
        }
    }
}

module.exports.customer = customer;