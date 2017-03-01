const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 3000 || process.env.PORT
const store = {}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/api/things', (req, res, next) => {
  if(!req.body.name) {
    res.sendStatus(400)
  }
  else {
    next()
  }
})

app.post('/api/things', (req, res, next) => {
  store[req.name] = req.body

  res.sendStatus(201)
})

app.get('/api/things', (req, res, next) => {
  const results = []

  for(let key in store) {
    results.push(store[key])
  }

  res.json(results)
})

app.listen(port, () => console.log('Sever started on port ' + port))

module.exports = app
