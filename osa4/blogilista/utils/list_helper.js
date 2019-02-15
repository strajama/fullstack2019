const _ = require('lodash')
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

const listWithOneBlog = [
  {
    id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  }
]

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs && blogs.length === 0) {
    return 0
  }
  const reducer = (sum, item) => {
    return sum + item
  }
  const likes = blogs.map(p => p.likes)
  return likes.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs && blogs.length === 0) {
    return null
  }
  const reducer = (best, next) => {
    if (best.likes >= next.likes) {
      return best
    } else {
      return next
    }
  }
  return blogs.reduce(reducer, blogs[0])
}

const mostBlogs = (blogs) => {
  if (blogs && blogs.length === 0) {
    return null
  }
  const authors = blogs.map(a => a.author)
  const sort = _.countBy(authors)
  const author = _.findLastKey(sort)
  const number = _.findLast(sort)
  return { 'author': author, 'blogs': number }
}

const mostLikes = (blogs) => {
  if (blogs && blogs.length === 0) {
    return null
  }
  const mapper = (a) => {
    const author = a.author
    const likes = a.likes
    return { author, likes }
  }
  const authorsLikes = _.sortBy(blogs).map(a => mapper(a))
  let uniqueAuthors = [authorsLikes[0]]
  for (let i = 1; i < authorsLikes.length; i++) {
    if (_.last(uniqueAuthors).author === authorsLikes[i].author) {
      _.last(uniqueAuthors).likes = _.last(uniqueAuthors).likes + authorsLikes[i].likes
    } else {
      uniqueAuthors = uniqueAuthors.concat(authorsLikes[i])
    }
  }
  return _.maxBy(uniqueAuthors, function(o) {return o.likes})
}

const nonExistingId = async () => {
  const removeBlog = new Blog ({
    'title': 'Pikku naisia',
    'author': 'L. M. Alcott',
    'url': 'https://github.com/strajama',
    'likes': 10
  })
  await removeBlog.save()
  await removeBlog.remove()

  return removeBlog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes,
  initialBlogs, listWithOneBlog, nonExistingId, blogsInDb
}