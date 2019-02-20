const SHA256   = require('crypto-js/sha256');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');


class Transaction {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }

  calculateHash() {
    return SHA256(this.fromAddress + this.toAddress + this.amount).toString();
  }

  signTransaction(signingKey) { 
    const hashTX = this.calculateHash();
    const sig = signingKey.sign(hashTX, 'base64');  

    // must check that public key === fromAddress 
    // You can only spend coins from wallet you have the private key for. 
    // And because the private key is linked to the public key, public key must = fromAddress
    if(signingKey.getPublic('hex') !== this.fromAddress) {
      throw new Error('You cannot sign transactions for other wallets!');
    }
    this.signiture = sig.toDER('hex'); // here we save the signiture to the transaction .toDER is just a special format
  }

  // Verify transaction has been correctly signed
  isValid() {
    if(this.fromAddress === null) return true;  // This is for mining rewards

    if(!this.signiture || this.signiture.length === 0) {
      throw new Error('No signiture in this transaction!');
    }

    // here we create a new public-key object from the fromAddress because the fromAddress is a public-key
    const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');

    // here we want to verify that the hash of this block has been signed by this.signiture
    return publicKey.verify(this.calculateHash(), this.signiture);
  }
}

module.exports.Transaction = Transaction;
