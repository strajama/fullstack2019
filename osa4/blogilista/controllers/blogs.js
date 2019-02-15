const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('../utils/list_helper')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
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
  const body = request.body
  const oneUser = await helper.oneUser()
  console.log(oneUser._id)
  const user = await User.findById(body.user)

  const blog = await new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: body.user === undefined ? oneUser._id : body.user
  })

  try{
    const savedBlog = await blog.save()
    if (user) {
      user.blogs = user.blogs.concat(savedBlog.id)
      await user.save()
    } else {
      oneUser.blogs = oneUser.blogs.concat(savedBlog.id)
      await oneUser.save()
    }

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