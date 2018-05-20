/**
 * Make random string
 * @returns {string} Random string
 */

function randomString() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  
    for (var i = 0; i < 14; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

/**
 * Add account to local storage
 * @param {string} prvtKey  
 * @returns {Object} Account instance 
 */

function addAccount(prvtKey) {
    return web3.eth.accounts.wallet.add(prvtKey, randomString());
}

/**
 * Delete account from locale storage
 */
function deleteAccount() {
    web3.eth.accounts.wallet.remove();
}

module.exports.deleteAccount = deleteAccount;
module.exports.addAccount = addAccount;