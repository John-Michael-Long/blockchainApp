const axios = require('axios');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const keyB = ec.genKeyPair();
const walletAddressB = keyB.getPublic('hex');  //public key
const privateKeyB = keyB.getPrivate('hex');

axios({
  method: 'post',
  url: 'http://localhost:3001/mine_pending',
  data: {
    walletAddress: walletAddressB
  }
})
.then(res => {
  console.log('res: ', res.data)
})
.catch(err => {
  console.log('err: ', err.code)
})