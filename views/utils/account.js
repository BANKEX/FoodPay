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
    return localStorage.getItem('prvtKey');
}

/**
 * Login owner
 * @returns Acoount
 */
function loginOwner() {
    if (!web3.eth.accounts[0]) {
        let privateKey = prompt("Enter your private key", '');
        // let password = prompt('Enter your password', '');

        var address = addAccount(privateKey);
        web3.personal.lockAccount(address, '');
        alert('Account successfully added');
    } else {
        unlockAccount(web3.eth.accounts[0], '');
        return web3.eth.accounts[0];
    }
}

function unlockAccount(account, password) {
    web3.personal.unlockAccount(account, password);
}