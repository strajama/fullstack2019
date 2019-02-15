const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {

  if (request.body.title === undefined) {
    return response.status(400).json({ error: 'title is missing' })
  }

  if (request.body.url === undefined) {
    return response.status(400).json({ error: 'url is missing' })
  }

  const blog = await new Blog(request.body)

  await blog.save()
  response.status(201).json(blog.toJSON())
})

module.exports = blogsRouter