const Json2csvParser = require('json2csv').Parser,
    qr = require('qr-image'),
    fs = require('fs'),
    // MultiToken = require('./multiToken.js'),
    aes = require('./../aes.js');
    Ethereum = require('./../ethereum.js');


function createCSVFile(data, fields) {
    const json2csvParser = new Json2csvParser({
        fields
    });
    const csv = json2csvParser.parse(data);

    var stream = fs.createWriteStream("my_file.csv");
    stream.once('open', function (fd) {
        stream.write(csv);
        stream.end();
    });
}

/**
 * Allows:
 *  1. Create N (countOfTokens) tokens.
 *  2. Create J (countOfAddressesToApprove) addresses and encrypt them.
 *  3. Approve J addresses.
 *  4. Write 'Encrypted Address', 'Address', 'Count of Token 1', 'Count of Token 2', 'Count of Token 3' to .csv
 * 
 * @param {number} countOfTokens How much tokens you will create
 * @param {string} contractOwnerPrvtKey Contract's owner private key
 * @param {string} tokensOwnerAddress Token's owner address  
 * @param {number} totalSupply Total supply
 * @param {number} countOfAddressesToApprove We're create 'countOfAddressesToApprove' addresses and approved them
 * @param {number} howMuchTokensWillBeApproved One address receives 'howMuchTokensWillBeApproved' tokens of each type
 */

function generateCSFData(countOfTokens, contractOwnerPrvtKey, tokensOwnerAddress, totalSupply, countOfAddressesToApprove, howMuchTokensWillBeApproved) {
    // web3.eth.personal.unlockAccount('0x6D377De54Bde59c6a4B0fa15Cb2EFB84BB32D433', '')
    if ((countOfAddressesToApprove * howMuchTokensWillBeApproved) > totalSupply) {
        console.log('Bad parameters. Total supply must be less then \'countOfAddressesToApprove * howMuchTokensWillBeApproved\'');
        return;
    }
    var dataArr = [];
    // const fields = ['Encrypted Address', 'Address', 'Count of Token 1', 'Count of Token 2', 'Count of Token 3'];
    const fields = ['Encrypted Address', 'Address'];
    // for (let i = 1; i <= countOfTokens; i++) {
    //     MultiToken.createNewSubtoken(contractOwnerPrvtKey, i, tokensOwnerAddress, totalSupply, (err, res) => {
    //         console.log('Token №' + i + 'was created');
    //     });

    // }

    // console.log(web3.eth)

    for (let i = 1; i <= countOfAddressesToApprove; i++) {
        let address = Ethereum.getAddress(Ethereum.createNewAccount());
        let encryptedAddress = aes.encryptAddress(address, '123');
        // for (let b = 1; b <= countOfTokens; b++) {
        //     MultiToken.approve(b, contractOwnerPrvtKey, address, howMuchTokensWillBeApproved, (err, res) => {
        //         console.log('Человек с адресом ' + address + ' получил ' + howMuchTokensWillBeApproved + ' токенов №' + b);
        //         console.log(res)
        //         console.log(err)
        //     });
        // }
        createAndSaveQRCode(encryptedAddress, i) 
        let data = {
            'Encrypted Address': encryptedAddress,
            'Address': address,
            // 'Count of Token 1': howMuchTokensWillBeApproved,
            // 'Count of Token 2': howMuchTokensWillBeApproved,
            // 'Count of Token 3': howMuchTokensWillBeApproved
        }
        dataArr.push(data)
    }

    createCSVFile(dataArr, fields);
}


function createAndSaveQRCode(data, i) {
    var code = qr.image(data, {
        type: 'png'
    });
    var output = fs.createWriteStream(`${i}.png`)

    code.pipe(output);
}
// createAndSaveQRCode();
generateCSFData(3, "0x61d94d1c3335c6c30c1336da9e4d54a586f1ffa882338a8bb9f8268296434bc9", "0x6D377De54Bde59c6a4B0fa15Cb2EFB84BB32D433", 4000, 200, 20)