/**
 * Allows to encrypt customer's address
 * Secret is stored only at the cashbox
 * @param {string} address Customer address
 * @param {string} secret Cashbox secret
 * @returns {string} Encrypted customer's address
 */
function encryptAddress(address, secret) {
    let ciphertext = CryptoJS.AES.encrypt(address, secret);
    return ciphertext.toString();
}

/**
 * Allows to decrypt customer's address
 * Secret is stored only at the cashbox
 * @param {string} ciphertext Encrypted customer's address
 * @param {string} secret Cashbox secret
 * @returns {string} Address
 */
function decryptAddress(ciphertext, secret) {
    let bytes = CryptoJS.AES.decrypt(ciphertext.toString(), secret);
    let plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return plaintext;
}