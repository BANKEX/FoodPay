var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Customer = new Schema({
    userID: {
        type: Number,
        default: ""
    },
    name: {
        type: String,
        default: ""
    },
    encryptedAddress: {
        type: String,
        default: ""
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('Customer', Customer);