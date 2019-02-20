const axios = require('axios');
const { Block } = require('../block.js');
const { createTransactionSetup } = require('./blockDB_addTrans_setup')
// const EC = require('elliptic').ec;
// const ec = new EC('secp256k1');



//get pending trans
// get latest block hash

createTransactionSetup();

let latestBlockHash = '';
let pendingTrans = [];
let difficulty = 0;
let chainLength;

axios({
  method: 'get',
  url: 'http://localhost:3001/get_latest_block_hash',
  data: 'auth goes here'
})
.then(res => {

  latestBlockHash = res.data[0];
  difficulty = res.data[1];
  chainLength = res.data[2];

  axios({
    method: 'get',
    url: 'http://localhost:3001/get_pending_transactions',
    data: 'auth goes here'
  })
  .then(res => {
    pendingTrans = res.data;

    console.log('difficulty: ', difficulty);
    console.log('latestBlockHash: ', latestBlockHash);
    console.log('chainLength: ', chainLength)

    let newBlock = new Block(Date.now(), pendingTrans, latestBlockHash);

    newBlock.mineBlock(difficulty)

    console.log('Block numer: ', chainLength + 1, 'minded successfully')

    axios({
      method: 'post',
      url: 'http://localhost:3001/mine_pending_front_end',
      data: newBlock
    })
    .then(res => {
      console.log('success')

      axios({
        method: 'get',
        url: 'http://localhost:3001/get_balance_sheet',
        data: 'auth goes here'
      })
      .then(res => {
        console.log('balance sheet: ', res.data);
      })
      .catch(err => {
        console.log('err: ', err.code);
      })
    })
    .catch(err => {
      console.log('err:', err.message)
    })

  })
  .catch(err => {
    console.log('err: ', err);
  })
})
.catch(err => {
  console.log('err: ', err);
})



  