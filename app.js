const express = require('express')
const lib = require('./lib')
const app = express()
const https = require('https')
const axios = require('axios').default
const bodyParser = require('body-parser')
const ping = require ("net-ping");

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

app.post('/ping', (req,res) => {
  var session = ping.createSession ();

  session.pingHost (req.body.host, (error, target, sent, rcvd) => {
    let ms = rcvd - sent

    if (error) {
      if (error instanceof ping.RequestTimedOutError) {
        res.send(target + ": Not alive");
      } else {
        res.send(target + ": " + error.toString ());
      }
    } else {
      res.send(target + ": Alive (ms=" + ms + ")")
    }
  })
})

app.listen(port)
