const express = require('express')
const path = require('path')
const crypto = require('crypto');
const bodyParser = require('body-parser');
const app = express()
const port = 8080
let nonce

app.set('view engine', 'ejs');

// Custom Middleware
const logRequests = (req, res, next) => {
  const date = new Date
  console.log(`[${date.getTime()}]:`, req.method, req.path, req.body)
  next()
}

const setCSP = (req, res, next) => {
  nonce = crypto.randomBytes(16).toString('base64');
  res.setHeader(
    'Content-Security-Policy',
    `script-src 'nonce-${nonce}'`
  )
  next()
}

// Middlewares
app.use(bodyParser.json())
app.use(logRequests)
// app.use(setCSP)
app.use(express.static(__dirname + '/static'));

// Methods
app.get('/', (req, res) => {
  res.render('pages/index', {
    nonce,
  });
});

app.post('/formdata', (req, res) => {
  res.set('Content-Type', 'application/JSON')
  res.send({ postData: req.body.postData })
})

// Listen
app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
})