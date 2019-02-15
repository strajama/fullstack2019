const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
  } catch(error) {
    next(error)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  console.log('nyt postataan')
  if (request.body.title === undefined) {
    return response.status(400).json({ error: 'title is missing' })
  }

  if (request.body.url === undefined) {
    return response.status(400).json({ error: 'url is missing' })
  }
  const body = request.body
  const blog = new Blog(body)
  const token = middleware.tokenExtractor(request)

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    blog.user = decodedToken.id
    await blog.save()
    const user = await User.findById(decodedToken.id)
    user.blog = user.blogs.concat(blog.id)
    await user.save()

    response.status(201).json(blog.toJSON())
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const token = middleware.tokenExtractor(request)
  try{
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      const decodedToken = jwt.verify(token, process.env.SECRET)
      if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
      }
      console.log('decoded', decodedToken)
      console.log(blog.user.toString())
      if ( blog.user.toString() === decodedToken.id) {
        await blog.delete()
        response.status(204).end()
      } else {
        return response.status(403).json({ error: 'unauthorized' })
      }
    }
    response.status(404).end()
  } catch (error) {
    next(error)
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
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter