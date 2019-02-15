const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response, next) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs.map(blog => blog.toJSON()))
    })
    .catch(error => next(error))
})

blogsRouter.post('/', (request, response, next) => {

  if (request.body.title === undefined) {
    return response.status(400).json({ error: 'title is missing' })
  }

  if (request.body.url === undefined) {
    return response.status(400).json({ error: 'url is missing' })
  }

  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result.toJSON())
    })
    .catch(error => next(error))
})

module.exports = blogsRouter