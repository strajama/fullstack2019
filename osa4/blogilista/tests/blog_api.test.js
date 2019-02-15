const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  },
  {
    id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12
  },
  {
    id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10
  },
  {
    id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0
  },
  {
    id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2
  }
]

beforeEach(async () => {
  await Blog.deleteMany()

  for (let i = 0; i < initialBlogs.length; i++) {
    let noteObject = new Blog(initialBlogs[i])
    await noteObject.save()
  }
})

test('all blogs are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  expect(response.body.length).toBe(initialBlogs.length)
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

  expect(response.body.length).toBe(initialBlogs.length + 1)
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
  expect(response.body.length).toBe(initialBlogs.length + 1)
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

afterAll(() => {
  mongoose.connection.close()
})