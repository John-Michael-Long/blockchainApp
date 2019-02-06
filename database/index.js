const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database');
const { Blockchain } = require('./blockchain')
const blockDB = express();
const PORT = process.env.PORT || 3001;

blockDB.use(bodyParser.json());
blockDB.use(bodyParser.urlencoded({extended: true}));

let jCoin = new Blockchain();

blockDB.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header(
      'Access-Control-Allow-Mehods',
      'GET, POST, PUT, PATCH, DELETE'
    );
    return res.status(200).json({});
  }
  // console.log('in blockDB.use')
  // console.log('jCoin: ', jCoin)

  next();
});

blockDB.post('/transaction', (req, res) => {
  console.log('In /transaction, request body: ', req.body)

  jCoin.addTransaction(req.body);

  res.send(jCoin)
})

blockDB.post('/mine_pending', (req, res) => {
  console.log('In /mine_pending, request body: ', req.body)

  jCoin.minePendingTransactions(req.body.walletAddres)

  res.send(jCoin)
})

// TODO
// get my balance
// get balance sheet

blockDB.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

/* 
MAKE A SERVER THAT HOSTS THE BLOCKCHAIN WITH API

MAKE A DATABASE THAT STORES BLOCKCHAIN STATE

AND / OR

MAKE A DATABASE THAT STORES AN EVENT LOG THAT CAN 
RECREATE THE BLOCKCHAIN 

PUT THE TRANSACTION ON THE FRONT END?????

*/


// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// }); 