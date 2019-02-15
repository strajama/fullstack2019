const _ = require('lodash')

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

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}