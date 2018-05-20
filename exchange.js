const MultiToken = require("./multiToken.js"),
    db = require('./db.js'),
    Aes = require('./aes.js');

require('dotenv').config()

function exchange(userID1, recieverName, tokenNum, value, callback) {
    db.customer.find.byUserID(userID1, (err, user1) => {
        db.customer.find.byName(recieverName, (err, user2) => {
            var address1;
            var address2;
            try {
                address1 = Aes.decryptAddress(user1.encryptedAddress, "123");
                address2 = Aes.decryptAddress(user2.encryptedAddress, "123");
            } catch (err) {
                callback(err, null);
                return;
            }


            MultiToken.decreaseApproval(tokenNum, process.env.OWNER_PRVT_KEY, address1, value, (err, doc) => {
                if (err) {
                    console.log(err);
                    callback(err, null);
                } else {
                    MultiToken.increaseApproval(tokenNum, process.env.OWNER_PRVT_KEY, address2, value, (err, doc) => {
                        if (err) {
                            console.log(err);
                            callback(err, null);
                        } else {
                            callback(null, doc);
                        }
                    }, 1);
                }
            }, 0);
        });
    });
}

module.exports.exchange = exchange;