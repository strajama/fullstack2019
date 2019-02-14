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

module.exports = {
  dummy, totalLikes, favoriteBlog
}