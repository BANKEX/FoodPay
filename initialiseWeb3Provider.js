require('dotenv').config()
Web3 = require('web3');

/** 
 *  Set the provider you want from Web3.providers
 *  @return {Object} web3
 */
function setWeb3Provider() {
    if (typeof web3 !== 'undefined')
        web3 = new Web3(web3.currentProvider);
    else
        web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/'+process.env.INFURA_TOKEN));

    return web3;
}

module.exports.setWeb3Provider = setWeb3Provider;