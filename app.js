const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000
const store = {}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/api/things', (req, res, next) => {
  if(!req.body.name) {
    console.log('failed validation', req.body);
    res.status(400).json(req.body)
  }
  else {
    next()
  }
})

app.post('/api/things', (req, res, next) => {
  store[req.name] = req.body

  console.log('stored', req.body);

  res.sendStatus(201)
})

app.get('/api/things', (req, res, next) => {
  const results = []

  for(let key in store) {
    results.push(store[key])
  }

  console.log('get hit!');
  res.json(results)
})

app.listen(port, () => console.log('Sever started on port ' + port))

module.exports = app
