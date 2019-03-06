const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const listHelper = require('../utils/list_helper')

beforeEach(async () => {
  await Blog.deleteMany()

  for (let i = 0; i < listHelper.initialBlogs.length; i++) {
    let blogObject = new Blog(listHelper.initialBlogs[i])
    await blogObject.save()
  }
})

test('all blogs are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  expect(response.body.length).toBe(listHelper.initialBlogs.length)
})

test('blogs have id-field', async () => {
  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r.id)
  expect(contents).toBeDefined()
})

test('new blog can be added', async () => {
  const newBlog = {
    'title': 'Pikku naisia',
    'author': 'L. M. Alcott',
    'url': 'https://github.com/strajama',
    'likes': 10
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const titles = response.body.map(t => t.title)

  expect(response.body.length).toBe(listHelper.initialBlogs.length + 1)
  expect(titles).toContain('Pikku naisia')
})

test('there is default value zero in likes', async () => {
  const newBlog = {
    'title': 'Pikku naisia',
    'author': 'L. M. Alcott',
    'url': 'https://github.com/strajama'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(listHelper.initialBlogs.length + 1)
  const last = response.body.pop()
  expect(last.likes).toBe(0)
})

test('bad request without title or url', async () => {
  const noTitle = {
    'author': 'L. M. Alcott',
    'url': 'https://github.com/strajama',
    'likes': 10
  }
  const noUrl = {
    'title': 'Pikku naisia',
    'author': 'L. M. Alcott',
    'likes': 10
  }

  await api
    .post('/api/blogs')
    .send(noTitle)
    .expect(400)

  await api
    .post('/api/blogs')
    .send(noUrl)
    .expect(400)
})

describe('deletion of a blog', async () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await listHelper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await listHelper.blogsInDb()
    expect(blogsAtEnd.length).toBe(listHelper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
  test('error when id is not valid', async() => {
    const blogToDelete = await listHelper.nonExistingId()

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(500)
  })
})

describe('updating of the blog', async () => {
  test('succeeds with a status code 200 when id is valid', async() => {
    const blogsAtStart = await listHelper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const newLikes = blogToUpdate.likes + 100
    blogToUpdate.likes = newLikes
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)

    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(listHelper.initialBlogs.length)
    const first = response.body[0]
    expect(first.likes).toBe(newLikes)
  })
})

afterAll(() => {
  mongoose.connection.close()
})