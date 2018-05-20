/** 
 *  Set the provider you want from Web3.providers
 *  @return {Object} web3
 */
function setWeb3Provider() {
    if (typeof web3 !== 'undefined')
        web3 = new Web3(web3.currentProvider);
    else
        web3 = new Web3(new Web3.providers.HttpProvider(config.provider.infura));

    return web3;
}


setWeb3Provider();