const { Transaction } = require('./transaction')
const { Block } = require('./block');
const SHA256   = require('crypto-js/sha256');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 4;
    this.pendingTransactions = [];
    this.miningReward = 15;
  }

  createGenesisBlock() {
    return new Block(Date.now(), "Genesis block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  minePendingTransactions(miningRewardAddress) {
    let newBlock = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);

    newBlock.mineBlock(this.difficulty);
    console.log('New block number ' + (this.chain.length + 1) + ' minded successfully with ' + newBlock.nonce + ' attempts.\n')

    this.chain.push(newBlock);
    this.pendingTransactions = [ 
      new Transaction(null, miningRewardAddress, this.miningReward) 
    ]; 
  }
  
  addTransaction(transaction) {
    console.log('inside addTransaction...')
    console.log('trans: ', transaction)

    if(!transaction.fromAddress || !transaction.toAddress) {
      throw new Error('Transaction must include to and from address');
    }

    if(!this.transactionIsValid(transaction)) {
      throw new Error('Cannot add invalid transaction to chain');
    }

    this.pendingTransactions.push(transaction);
  }

  transactionIsValid(transaction) {
    if(transaction.fromAddress === null) return true;  // transaction is for mining rewards

    if(!transaction.signiture || transaction.signiture.length === 0) {
      throw new Error('No signiture in this transaction!');
    }

    // here we create a new public-key object from the fromAddress 
    // because the fromAddress is a public-key
    const publicKey = ec.keyFromPublic(transaction.fromAddress, 'hex');

    const txHash = SHA256(transaction.fromAddress + transaction.toAddress + transaction.amount).toString();

    // here we want to verify that the hash of this block has been signed by this.signiture
    return publicKey.verify(txHash, transaction.signiture);

  }

  iterateBlockchain(callback) {
    for(const block of this.chain) {
      for(const trans of block.transactions) {
        callback(trans);
      }
    }
  }

  getAllBalances() {
    let balanceSheet = {};
    this.iterateBlockchain( trans => {
      if(balanceSheet[trans.fromAddress] === undefined){
        balanceSheet[trans.fromAddress] = -trans.amount;
      } else {
        balanceSheet[trans.fromAddress] -= trans.amount;
      }

      if(balanceSheet[trans.toAddress] === undefined){
        balanceSheet[trans.toAddress] = trans.amount;
      } else {
        balanceSheet[trans.toAddress] += trans.amount;
      }
    })
    return balanceSheet
  }

  getBalanceOfAddress(address) {
    let balance = 0;

    this.iterateBlockchain( trans => {
      if(trans.fromAddress === address) {
        balance -= trans.amount;
      }
      if(trans.toAddress === address) {
        balance += trans.amount;
      }      
    })
    return balance;
  }

  isChainValid() {
    for(let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if(!currentBlock.hasValidTransactions()) {
        return false;
      }

      if(currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if(currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
}

module.exports.Blockchain = Blockchain;
