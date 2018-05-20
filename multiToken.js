const CONTRACT = require('./contractData.js'),
    Web3Provider = require('./initialiseWeb3Provider.js'),
    localAccount = require('./account.js');

var web3 = Web3Provider.setWeb3Provider();

var contractInstance = new web3.eth.Contract(CONTRACT.CONTRACT_ABI_ARRAY, CONTRACT.CONTRACT_ADDRESS);

/**
 * Allows to create a new subtoken, which based on multitoken contract (888 token)
 * @param {string} contractOwnerPrvtKey Private key used to get contract owner address
 * @param {number} tokenID Unique ID of token which would be created
 * @param {string} tokenOwnerAddress Token's owner address
 * @param {number} totalSupply Total amount of Tokens, which would be created on token's owner address
 * @param {function(Error, string)} callback If success returns a transaction hash as second parameter 
 */

function createNewSubtoken(contractOwnerPrvtKey, tokenID, tokenOwnerAddress, totalSupply, callback) {
    let account = localAccount.addAccount(contractOwnerPrvtKey);
    contractInstance.methods.createNewSubtoken(Number(tokenID), String(tokenOwnerAddress), Number(totalSupply)).send({
        from: account.address,
        gasPrice: 0x3b9bca00,
        gas: 210000
    }, (err, result) => {

        localAccount.deleteAccount();
        callback(err, result);
    });
}

/**
 * Gets the total amount of tokens stored by the contract
 * @param {number} tokenID It's a subtoken identifier
 * @param {function(Error, number)} callback If success - representing the total amount of tokens, else error
 */

function totalSupply(tokenID, callback) {
    let totalSupply = contractInstance.methods.totalSupply(Number(tokenID)).call(
        (err, result) => {
            let totalSupply;
            if (!err) totalSupply = result;
            callback(err, totalSupply);
        }
    );
}

/**
 * Gets the balance of the specified address
 * @param {number} tokenID It's a subtoken identifier
 * @param {string} owner Address to query the balance of
 * @param {function(Error, number)} callback Representing the amount owned by the passed address
 */

function balanceOf(tokenID, owner, callback) {
    contractInstance.methods.balanceOf(Number(tokenID), String(owner)).call((err, result) => {
        let tokenBalance;
        if (!err) tokenBalance = result;
        callback(err, tokenBalance);
    });
}

/**
 * Approve the passed address to spend the specified amount of tokens on behalf on sender address
 * @param {number} tokenID It's a subtoken identifier
 * @param {string} senderPrvtKey Sender private key used to get the address which will send the funds
 * @param {string} spenderAddress The address which will spend the funds.
 * @param {number} value The amount of tokens to be spent
 * @param {function(Error, boolean)} callback If success - returns "true", else - "false"
 */

function approve(tokenID, senderPrvtKey, spenderAddress, value, callback, nonce) {
    web3.eth.getTransactionCount("0x6D377De54Bde59c6a4B0fa15Cb2EFB84BB32D433").then(nonce1 => {
        let account = localAccount.addAccount(senderPrvtKey);
        contractInstance.methods.approve(Number(tokenID), String(spenderAddress), Number(value)).send({
            nonce: nonce1 + nonce,
            from: account.address,
            gasPrice: 0x3b9bca00,
            gas: 210000
        }, (err, result) => {
            localAccount.deleteAccount();
            callback(err, result);
        });
    });
};

function approve(tokenID, senderPrvtKey, spenderAddress, value, callback, nonce) {
    web3.eth.getTransactionCount("0x6D377De54Bde59c6a4B0fa15Cb2EFB84BB32D433").then(nonce1 => {
        let account = localAccount.addAccount(senderPrvtKey);
        contractInstance.methods.approve(Number(tokenID), String(spenderAddress), Number(value)).send({
            nonce: nonce1 + nonce,
            from: account.address,
            gasPrice: 0x3b9bca00,
            gas: 210000
        }, (err, result) => {
            localAccount.deleteAccount();
            callback(err, result);


        });
    });
};

function approveArr(tokenID, senderPrvtKey, spenderAddress, value, callback, nonce) {
    web3.eth.getTransactionCount("0x6D377De54Bde59c6a4B0fa15Cb2EFB84BB32D433").then(nonce1 => {
        let account = localAccount.addAccount(senderPrvtKey);
        contractInstance.methods.approveArr(tokenID, spenderAddress, value).send({
            nonce: nonce1 + nonce,
            from: account.address,
            gasPrice: 0x3b9bca00,
            gas: 2300000
        }, (err, result) => {
            localAccount.deleteAccount();
            callback(err, result);
        });
    });
};

function createNewSubtokens(contractOwnerPrvtKey, tokenID, tokenOwnerAddress, totalSupply, callback) {
    let account = localAccount.addAccount(contractOwnerPrvtKey);
    contractInstance.methods.createNewSubtokens(tokenID, tokenOwnerAddress, totalSupply).send({
        from: account.address,
        gasPrice: 0x3b9bca00,
        gas: 210000
    }, (err, result) => {

        localAccount.deleteAccount();
        callback(err, result);
    });
};

function getSignTXOfFunctionApprove(nonce, tokenNum, value) {
    return new Promise((resolve, reject) => {
        var encodeABI = contractInstance.methods.approve(Number(tokenNum), String("0x6D377De54Bde59c6a4B0fa15Cb2EFB84BB32D433"), Number(value)).encodeABI();

        const txParam = {
            nonce: nonce,
            to: CONTRACT.CONTRACT_ADDRESS,
            from: "0x6D377De54Bde59c6a4B0fa15Cb2EFB84BB32D433",
            data: encodeABI,
            gasPrice: 0x3b9bca00,
            // gasLimit: 4000000,
            gas: 210000
        };

        let account = localAccount.addAccount("0x61d94d1c3335c6c30c1336da9e4d54a586f1ffa882338a8bb9f8268296434bc9");
        account.signTransaction(txParam, (err, doc) => {
            resolve(doc.rawTransaction)
        });

    });
}

// getSignTXOfFunctionApprove(0, 1, 20).then((a) => {
//     web3.eth.sendSignedTransaction(a, (err, transactionHash) => {
//         if (err) {
//             console.log(err);
//             callback(err, null);
//             return;
//         }
//         console.log(transactionHash)
//     });

// })

/**
 * Increase the amount of tokens that an owner allowed to a spender.
 * @param {number} tokenID It's a subtoken identifier
 * @param {string} senderPrvtKey Sender private key used to get the address which will send the funds
 * @param {string} spenderAddress The address which will spend the funds
 * @param {number} addedValue The amount of tokens to increase the allowance by
 * @param {function(Error, string)} callback Error, Transaction hash
 */

function increaseApproval(tokenID, senderPrvtKey, spenderAddress, addedValue, callback, nonce) {
    web3.eth.getTransactionCount("0x6D377De54Bde59c6a4B0fa15Cb2EFB84BB32D433").then(nonce1 => {
        let account = localAccount.addAccount(senderPrvtKey);
        contractInstance.methods.increaseApproval(Number(tokenID), String(spenderAddress), Number(addedValue)).send({
            nonce: nonce1 + nonce,
            from: account.address,
            gasPrice: 0x3b9bca00,
            gas: 210000
        }, (err, result) => {
            localAccount.deleteAccount();
            callback(err, result);
        });
    });
}

/**
 * Decrease the amount of tokens that an owner allowed to a spender.
 * @param {number} tokenID It's a subtoken identifier
 * @param {string} senderPrvtKey Sender private key used to get the address which will send the funds
 * @param {string} spenderAddress The address which will spend the funds
 * @param {number} addedValue The amount of tokens to decrease the allowance by
 * @param {function(Error, string)} callback Error, Transaction hash
 */

function decreaseApproval(tokenID, senderPrvtKey, spenderAddress, subtractedValue, callback, nonce) {
    web3.eth.getTransactionCount("0x6D377De54Bde59c6a4B0fa15Cb2EFB84BB32D433").then(nonce1 => {
        let account = localAccount.addAccount(senderPrvtKey);
        contractInstance.methods.decreaseApproval(Number(tokenID), String(spenderAddress), Number(subtractedValue)).send({
            nonce: nonce + nonce1,
            from: account.address,
            gasPrice: 0x3b9bca00,
            gas: 210000
        }, (err, result) => {
            localAccount.deleteAccount();
            callback(err, result);
        });
    });
}

/**
 * Function to check the amount of tokens that an owner allowed to a spender
 * @param {number} tokenID It's a subtoken identifier
 * @param {string} owner The address which owns the funds
 * @param {string} spender The address which will spend the funds
 * @param {function(Error, number)} callback If success - get amount of tokens for which a spender has the right
 */

function allowance(tokenID, owner, spender, callback) {
    contractInstance.methods.allowance(Number(tokenID), String(owner), String(spender)).call((err, result) => {
        let allowance;
        if (!err) allowance = result;
        callback(err, allowance);
    });
}

/**
 * Ttransfer token for a specified address
 * @param {number} tokenID It is subtoken identifier
 * @param {string} from Sender private key used to get the address which will send the funds
 * @param {string} to The address to transfer to
 * @param {number} value The amount of tokens which would be spent to
 * @param {function(Error, string)} callback Error, Transaction hash
 */

function transfer(tokenID, from, to, value, callback) {
    let account = localAccount.addAccount(from);
    contractInstance.methods.transfer(Number(tokenID), String(to), Number(value)).send({
        from: account.address,
        gasPrice: 0x3b9bca00,
        gas: 210000
    }, (err, result) => {
        localAccount.deleteAccount();
        callback(err, result);
    });
}

/**
 * Transfer tokens from one address to another
 * @param {number} tokenID It is subtoken identifier
 * @param {string} senderPrvtKey Sender private key used to send transaction into blockchain
 * @param {string} from he address which you want to send tokens from
 * @param {string} to The address which you want to transfer to
 * @param {number} value The amount of tokens to be transferred
 * @param {function(Error, string)} callback Error, Transaction hash
 */

function transferFrom(tokenID, senderPrvtKey, from, to, value, callback) {
    let account = localAccount.addAccount(senderPrvtKey);
    contractInstance.methods.transferFrom(Number(tokenID), String(from), String(to), Number(value)).send({
        from: account.address,
        gasPrice: 0x3b9bca00,
        gas: 210000
    }, (err, result) => {
        localAccount.deleteAccount();
        callback(err, result);
    });
}

module.exports.transfer = transfer;
module.exports.transferFrom = transferFrom;
module.exports.totalSupply = totalSupply;
module.exports.balanceOf = balanceOf;
module.exports.allowance = allowance;
module.exports.approve = approve;
module.exports.approveArr = approveArr;
module.exports.increaseApproval = increaseApproval;
module.exports.decreaseApproval = decreaseApproval;
module.exports.createNewSubtoken = createNewSubtoken;
module.exports.createNewSubtokens = createNewSubtokens;
module.exports.getSignTXOfFunctionApprove = getSignTXOfFunctionApprove;