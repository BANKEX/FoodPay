const fs = require('fs'),
    MultiToken = require('./multiToken.js');

    require('dotenv').config()

var s = fs.readFileSync("my_file.csv", "ascii")
var addressesArray = s.split(/\r?\n/).filter(function (x) {
    return x
}).map(function (x) {
    return x.split(",")
});


/**
 * 1. Массив с номерами токенов
 * 2. Массив со значениями, на которые будут апрувиться адреса на конкретный токен
 */
const NUMBERS_OF_TOKENS = [1];
const APPROVE_VALUES = [5000];



async function approveAddresses() {
    var addressesArr1 = [];
    var addressesArr2 = [];
    var addressesArr3 = [];
    var addressesArr4 = [];
    for (let i in addressesArray) {
        let address = addressesArray[i][1].substring(1, addressesArray[i][1].length - 1);

        if (i > 150) {
            addressesArr4.push(address);
        } else if (i > 100) {
            addressesArr3.push(address);
        } else if (i > 50) {
            addressesArr2.push(address);
        } else {
            addressesArr1.push(address);
        }

    }
    console.log(addressesArr1);

    MultiToken.approveArr(NUMBERS_OF_TOKENS, process.env.OWNER_PRVT_KEY, addressesArr1, APPROVE_VALUES, (err, doc) => {
        console.log(err, doc)
    }, 0);
    MultiToken.approveArr(NUMBERS_OF_TOKENS, process.env.OWNER_PRVT_KEY, addressesArr2, APPROVE_VALUES, (err, doc) => {
        console.log(err, doc)
    }, 1);
    MultiToken.approveArr(NUMBERS_OF_TOKENS, process.env.OWNER_PRVT_KEY, addressesArr3, APPROVE_VALUES, (err, doc) => {
        console.log(err, doc)
    }, 2);
    MultiToken.approveArr(NUMBERS_OF_TOKENS, process.env.OWNER_PRVT_KEY, addressesArr4, APPROVE_VALUES, (err, doc) => {
        console.log(err, doc)
    }, 3);
}

function createTokens(count, value) {
    var values = [];
    var tokens = [];
    for (let i = 0; i < count.length; i++) {
        values.push(value);
        tokens.push(i + 1);
    }

    MultiToken.createNewSubtokens(process.env.OWNER_PRVT_KEY, tokens, "0x6D377De54Bde59c6a4B0fa15Cb2EFB84BB32D433", values, (err, doc) => {
        console.log(err, doc);
    });
}

/**
 * 1. Кол-во токенов
 * 2. Сколько totalSupply для каждого токена
 */
// createTokens(20, 5000);

/**
 * Апрувит адреса
 */
// approveAddresses();