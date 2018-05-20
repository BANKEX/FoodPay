const QrCode = require('qrcode-reader'),
        Jimp = require("jimp"),
        fs = require('fs');

var qr = new QrCode();

function decodeQRCode(file_path, callback) {
    var buffer = fs.readFileSync(__dirname + "/"+file_path);
    Jimp.read(buffer, function(err, image) {
        if (err) {
            // console.error(err);
            callback(err, null);
        }
        var qr = new QrCode();
        qr.callback = function(err, value) {
            if (err) {
                // console.error(err);
                callback(err, null);
                // TODO handle error
            }
            callback(null, value.result);
            // console.log(value);
        };
        qr.decode(image.bitmap);
    });
}

module.exports.decodeQRCode = decodeQRCode;
