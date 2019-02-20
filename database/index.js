const express = require('express');
const bodyParser = require('body-parser');
const { Blockchain } = require('./blockchain')
const blockDB = express();
const PORT = process.env.PORT || 3001;

blockDB.use(bodyParser.json());
blockDB.use(bodyParser.urlencoded({extended: true}));

/* 
TODO:
- distributed network model? micro-services?
- add event log??? 
- put "mineBlock" on front-end, 
  - have minePendingTransactions or isChainValid...
- add validation / verification for all API methods
- use testing framework: mocha/chai, jest/enzyme

WEBSOCKST - chat - type of server/client interaction
WEBHOOKS - server a talks to server b

SSH connections - secure socket shell, can SSH into another machine via terminal,
 - limitations - must be ongoing conneciton (network exicution terminations)
HTTP client vs EMail Client


To start form boilerplate, 
Clone 
create new repo
add new repo as a new origin
then push to a new origin

*/

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
  console.log('In /transaction')

  jCoin.addTransaction(req.body);

  res.send('transaction added')
})

blockDB.post('/mine_pending', (req, res) => {
  console.log('In /mine_pending')

  jCoin.minePendingTransactions(req.body.walletAddress)

  res.send('block mined')
})

blockDB.get('/get_my_balance', (req, res) => {
  console.log('in /get_my_balance')

  const balance = jCoin.getBalanceOfAddress(req.body.walletAddress)

  res.send(balance.toString())
})

blockDB.get('/get_balance_sheet', (req, res) => {
  console.log('in /get_balance_sheet')

  const balanceSheet = jCoin.getAllBalances();

  res.send(balanceSheet)
})

blockDB.get('/get_latest_block_hash', (req, res) => {
  console.log('in get_latest_block_hash')

  res.send([jCoin.getLatestBlock().hash, jCoin.difficulty, jCoin.chain.length])
})

blockDB.get('/get_pending_transactions', (req, res) => {
  res.send(jCoin.getPendingTransactions())
})

blockDB.post('/mine_pending_front_end', (req, res) => {
  console.log('In /mine_pending_front_end')

  // need to abstract this away in Blockchain class

  console.log('req: ', req.body)
  jCoin.chain.push(req.body)
  // jCoin.pendingTransactions = [ 
  //   new Transaction(null, miningRewardAddress, jCoin.miningReward) 
  // ]; 
  

  res.send('block added')
})



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