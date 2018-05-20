var contract = web3.eth.contract(CONTRACT_ABI_ARRAY);
var contractInstance = contract.at(CONTRACT_ADDRESS);

function signAndSendRawTx(nonce, contractAddress, data, from, callback) {
    const txParam = {
        // nonce: web3.eth.getTransactionCount(getAddress(from)),
        nonce: nonce,
        to: contractAddress,
        from: getAddress(from),
        data: data,
        gasPrice: 0x3b9bca00,
        // gasLimit: 4000000,
        gas: 210000
    };

    console.log(txParam)

    const tx = new ethereumjs.Tx(txParam);
    const privateKeyBuffer = ethereumjs.Buffer.Buffer.from(from.substring(2), 'hex');
    tx.sign(privateKeyBuffer);
    const serializedTx = tx.serialize();
    
    web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), (err, transactionHash) => {
        if (err) {
            console.log(err);
            callback(err, null);
            return;
        }
        callback(err, transactionHash);
    });
}

// console.log(web3.eth)

/**
 * Allows to create a new subtoken, which based on multitoken contract (888 token)
 * @param {string} contractOwnerPrvtKey Private key used to get contract owner address
 * @param {number} tokenID Unique ID of token which would be created
 * @param {string} tokenOwnerAddress Token's owner address
 * @param {number} totalSupply Total amount of Tokens, which would be created on token's owner address
 * @param {function(Error, string)} callback If success returns a transaction hash as second parameter 
 */

function createNewSubtoken(nonce, contractOwnerPrvtKey, tokenID, tokenOwnerAddress, totalSupply, callback) {
    var data = web3.eth.contract(CONTRACT_ABI_ARRAY).at(CONTRACT_ADDRESS).createNewSubtoken.getData(Number(tokenID), String(tokenOwnerAddress), Number(totalSupply));
    signAndSendRawTx(nonce, CONTRACT_ADDRESS, data, contractOwnerPrvtKey, (err, txHash) => {
        callback(err, txHash);
    });
}

/**
 * Gets the total amount of tokens stored by the contract
 * @param {number} tokenID It's a subtoken identifier
 * @param {function(Error, number)} callback If success - representing the total amount of tokens, else error
 */

function totalSupply(tokenID, callback) {
    contractInstance.totalSupply(Number(tokenID), (err, result) => {
        let totalSupply;
        if (!err) totalSupply = result.toNumber();
        callback(err, totalSupply);
    });
}

/**
 * Gets the balance of the specified address
 * @param {number} tokenID It's a subtoken identifier
 * @param {string} owner Address to query the balance of
 * @param {function(Error, number)} callback Representing the amount owned by the passed address
 */

function balanceOf(tokenID, owner, callback) {
    contractInstance.balanceOf(Number(tokenID), String(owner), (err, result) => {
        let tokenBalance;
        if (!err) tokenBalance = result.toNumber();
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

function approve(nonce, tokenID, senderPrvtKey, spenderAddress, value, callback) {
    var data = web3.eth.contract(CONTRACT_ABI_ARRAY).at(CONTRACT_ADDRESS).approve.getData(Number(tokenID), String(spenderAddress), Number(value));
    signAndSendRawTx(nonce, CONTRACT_ADDRESS, data, senderPrvtKey, (err, txHash) => {
        callback(err, txHash);
    });
};

/**
 * Increase the amount of tokens that an owner allowed to a spender.
 * @param {number} tokenID It's a subtoken identifier
 * @param {string} senderPrvtKey Sender private key used to get the address which will send the funds
 * @param {string} spenderAddress The address which will spend the funds
 * @param {number} addedValue The amount of tokens to increase the allowance by
 * @param {function(Error, string)} callback Error, Transaction hash
 */

function increaseApproval(nonce, tokenID, senderPrvtKey, spenderAddress, addedValue, callback) {
    var data = web3.eth.contract(CONTRACT_ABI_ARRAY).at(CONTRACT_ADDRESS).increaseApproval.getData(Number(tokenID), String(spenderAddress), Number(addedValue));
    signAndSendRawTx(nonce, CONTRACT_ADDRESS, data, senderPrvtKey, (err, txHash) => {
        callback(err, txHash);
    });
}

/**
 * Decrease the amount of tokens that an owner allowed to a spender. (This function takes the locked account)
 * @param {number} tokenID It's a subtoken identifier
 * @param {string} from  Sender private key from which the transfer is made
 * @param {string} spenderAddress The address which will spend the funds
 * @param {number} addedValue The amount of tokens to decrease the allowance by
 * @param {function(Error, string)} callback Error, Transaction hash
 */

function decreaseApproval(nonce,tokenID, from, spenderAddress, subtractedValue, callback) {
    console.log("Токен: "+tokenID+" Value: "+subtractedValue);
    var data = web3.eth.contract(CONTRACT_ABI_ARRAY).at(CONTRACT_ADDRESS).decreaseApproval.getData(Number(tokenID), String(spenderAddress), Number(subtractedValue));
    signAndSendRawTx(nonce, CONTRACT_ADDRESS, data, from, (err, txHash) => {
        callback(err, txHash);
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
    console.log(spender)
    contractInstance.allowance(Number(tokenID), String(owner), String(spender), (err, result) => {
        let allowance;
        if (!err) allowance = result.toNumber();
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

function transfer(nonce,tokenID, from, to, value, callback) {
    var data = web3.eth.contract(CONTRACT_ABI_ARRAY).at(CONTRACT_ADDRESS).transfer.getData(Number(tokenID), String(to), Number(value));
    signAndSendRawTx(nonce, CONTRACT_ADDRESS, data, from, (err, txHash) => {
        callback(err, txHash);
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

function transferFrom(nonce,tokenID, senderPrvtKey, from, to, value, callback) {
    var data = web3.eth.contract(CONTRACT_ABI_ARRAY).at(CONTRACT_ADDRESS).transferFrom.getData(Number(tokenID), String(from), String(to), Number(value));
    signAndSendRawTx(nonce, CONTRACT_ADDRESS, data, senderPrvtKey, (err, txHash) => {
        callback(err, txHash);
    });
}