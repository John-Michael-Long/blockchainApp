const axios = require('axios');
const { Transaction } = require('./transaction.js')
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const keyA = ec.genKeyPair();
const walletAddressA = keyA.getPublic('hex');
const privateKeyA = keyA.getPrivate('hex');

const keyB = ec.genKeyPair();
const walletAddressB = keyB.getPublic('hex');
const privateKeyB = keyB.getPrivate('hex');

const keyC = ec.genKeyPair();
const walletAddressC = keyC.getPublic('hex');
const privateKeyC = keyC.getPrivate('hex');

const keyD = ec.genKeyPair();
const walletAddressD = keyD.getPublic('hex');  
const privateKeyD = keyD.getPrivate('hex');


const tx1 = new Transaction(walletAddressA, 'walletAddressB', 100)
tx1.signTransaction(keyA);

const tx2 = new Transaction(walletAddressB, walletAddressC, 30)
tx2.signTransaction(keyB);

const tx3 = new Transaction(walletAddressB, walletAddressD, 50)
tx3.signTransaction(keyB);

const tx4 = new Transaction(walletAddressD, walletAddressA, 20)
tx4.signTransaction(keyD);

const tx5 = new Transaction(walletAddressC, walletAddressA, 40)
tx5.signTransaction(keyC);

axios({
  method: 'post',
  url: 'http://localhost:3001/transaction',
  data: tx1
})
.then(res => {
  console.log('res: ', res.data)
})
.catch(err => {
  console.log('err: ', err.code)
})

axios({
  method: 'post',
  url: 'http://localhost:3001/transaction',
  data: tx2
})
.then(res => {
  console.log('res: ', res.data)
})
.catch(err => {
  console.log('err: ', err.code)
})

axios({
  method: 'post',
  url: 'http://localhost:3001/transaction',
  data: tx3
})
.then(res => {
  console.log('res: ', res.data)
})
.catch(err => {
  console.log('err: ', err.code)
})

axios({
  method: 'post',
  url: 'http://localhost:3001/transaction',
  data: tx4
})
.then(res => {
  console.log('res: ', res.data)
})
.catch(err => {
  console.log('err: ', err.code)
})

axios({
  method: 'post',
  url: 'http://localhost:3001/transaction',
  data: tx5
})
.then(res => {
  console.log('res: ', res.data)
})
.catch(err => {
  console.log('err: ', err.code)
})


