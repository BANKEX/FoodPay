const keythereum = require('keythereum'),
    localAccount = require('./account.js'),
Web3Provider = require('./initialiseWeb3Provider.js');

Web3Provider.setWeb3Provider();

/** 
 *  Should create random ethereum private key
 *  @return {string} ethereum private key
 */
function createNewAccount() {
    let params = {
        keyBytes: 32,
        ivBytes: 16
    };
    let dk = keythereum.create(params);

    return "0x" + dk.privateKey.reduce((memo, i) => {
        return memo + ('0' + i.toString(16)).slice(-2);
    }, '');
}

// var pr = createNewAccount();
// var ad = getAddress(pr);
// console.log(pr)
// console.log(ad)


/** 
 *  Should create address from private key
 *  @param {string} prvtKey ethereum privateKey
 *  @return {string} ethereum address
 */
function getAddress(prvtKey) {
    let privateKey = "";
    for (i = 2; i < prvtKey.length; i++) {
        privateKey += prvtKey[i];
    }
    return keythereum.privateKeyToAddress(privateKey);
}

/** 
 *  Allows to get balance in Wei
 *  @param {string} address ethereum address
 *  @return {number} account balance in Wei
 */
function getBalance(address, callback) {
    web3.eth.getBalance(address)
        .then(
            (balance) => {
                callback(balance);
            }
        );;
}

/**
 * Allows send eth transaction in ethereum blockchain
 * @param {string} from Sender's privateKey
 * @param {string} to Recipient address
 * @param {number} amount Amount of ETH for send
 * @param {function(Error, string)} callback If succes - returns transaction hash, else - error
 */
function sendTransaction(from, to, amount, callback) {
    let account = localAccount.addAccount(from);
    web3.eth.sendTransaction({
        from: account,
        to: to,
        value: web3.utils.toWei(String(amount), 'ether'),
        gasLimit: 21000,
        gasPrice: 20000000000
    }, (err, txHash) => {
        localAccount.deleteAccount();
        callback(err, txHash);
    })
}

/**
 * Checks: if address valid
 * @param {string} address Ethereum address for checking. (HEX String)
 */
function isAddress(address) {
    return web3.utils.isAddress(address);
}

module.exports.createNewAccount = createNewAccount;
module.exports.getAddress = getAddress;
module.exports.getBalance = getBalance;
module.exports.sendTransaction = sendTransaction;
module.exports.isAddress = isAddress;
