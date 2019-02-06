const axios = require('axios');


axios({
  method: 'post',
  url: 'http://localhost:3000/',
  data: {
    data1: 'this is a test'
  }
})
.then(res => {
  console.log('res: ', res.data)
})
.catch(err => {
  console.log('err: ', err.code)
})