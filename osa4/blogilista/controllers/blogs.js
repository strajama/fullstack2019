const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs.map(blog => blog.toJSON()))
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.post('/', async (request, response, next) => {

  if (request.body.title === undefined) {
    return response.status(400).json({ error: 'title is missing' })
  }

  if (request.body.url === undefined) {
    return response.status(400).json({ error: 'url is missing' })
  }

  const blog = await new Blog(request.body)
  try{
    await blog.save()
    response.status(201).json(blog.toJSON())
  } catch (exception) {
    next(exception)
  }

})

blogsRouter.delete('/:id', async (request, response, next) => {
  try{
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }

})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  try{
    const update = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(update.toJSON())
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter