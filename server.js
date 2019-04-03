const express = require('express')
const path = require('path')
const crypto = require('crypto');
const app = express()
const port = 8080
let nonce

// set the view engine to ejs
app.set('view engine', 'ejs');

// Custom Middleware
const logRequests = (req, res, next) => {
  const date = new Date
  console.log(`[${date.getTime()}]:`, req.method, req.path, req.body = '')
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
app.use(logRequests)
app.use(setCSP)
app.use(express.static(__dirname + '/static'));

app.get('/', (req, res) => {
  res.render('pages/index', {
    nonce,
  });
});

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
})