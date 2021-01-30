const express = require('express')
const lib = require('./lib')
const app = express()
const https = require('https')
const axios = require('axios').default
const bodyParser = require('body-parser')

const port = lib.normalizePort(process.env.PORT || '3000')
const secretHeader = 'X-SECRET-KEY'
const secret = process.env.SECRET

app.set('port', port);
app.use(bodyParser.json());

app.use((req, res, next)=> {
  if (req.header(secretHeader) != secret) {
    res.send('Not authorized')
  } else {
    next()
  }
})

app.post('/http', (req, res) => {
  console.log(req.body)
  if (!req.body.method){
    res.send('Must supply connection object')
  } else {
    axios(req.body).then((axiosRes) => {
      res.send(axiosRes.status)
    }).catch((err) => {
      res.send(err)
    })
  }
})

app.listen(port)
