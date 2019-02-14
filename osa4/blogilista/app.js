const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const blogsRouter = require('./controllers/blogs')

const morgan = require('morgan')
app.use(morgan('tiny', {
  skip: (request) => { return request.method === 'POST' }
}))

app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}, {
  skip: (request) => { return request.method !== 'POST' }
}))

const cors = require('cors')
app.use(cors())

app.use(bodyParser.json())
app.use('/api/blogs', blogsRouter)

module.exports = app