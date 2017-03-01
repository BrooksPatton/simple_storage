const supertest = require('supertest')
const chai = require('chai')
const app = require('../app')

const should = chai.should()
const api = supertest(app)

describe('canary test', () => {
  it('should pass', () => {
    const five = 5

    five.should.be.equal(5)
  })
})

describe('saving a object', () => {
  it('should succeed', done => {
    const payload = {
      name: 'test',
      colors: ['white', 'black', 'red']
    }

    api.post('/api/things')
    .send(payload)
    .expect(201, done)
  })

  it('should fail when no name is passed in', done => {
    const payload = {
      colors: ['white', 'black', 'red']
    }

    api.post('/api/things')
    .send(payload)
    .expect(400, done)
  })

  it('should fail when the name is an empty string', done => {
    const payload = {
      name: '',
      colors: ['white', 'black', 'red']
    }

    api.post('/api/things')
    .send(payload)
    .expect(400, done)
  })
})

describe('getting all objects', () => {
  before('send the object', done => {
    const payload = {
      name: 'test',
      colors: ['white', 'black', 'red']
    }

    api.post('/api/things')
    .send(payload)
    .expect(201, done)
  })

  it('should succeed', done => {
    api.get('/api/things')
    .expect(200)
    .end((err, res) => {
      if(err) return done(err)

      res.body[0].name.should.be.equal('test')
      res.body[0].colors.should.deep.equal(['white', 'black', 'red'])

      done()
    })
  })
})
