const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('totalLikes', () => {

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listHelper.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listHelper.initialBlogs)
    expect(result).toBe(36)
  })
})

describe('favoriteBlog', () => {

  test('of empty list is null', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toBeNull()
  })

  test('when list has only one blog equals that blog', () => {
    const result = listHelper.favoriteBlog(listHelper.listWithOneBlog)
    expect(result).toEqual(listHelper.listWithOneBlog[0])
  })

  test('when list has many blogs the most liked is returned', () => {
    const result = listHelper.favoriteBlog(listHelper.initialBlogs)
    expect(result).toEqual(listHelper.initialBlogs[2])
  })
})

describe('mostBlogs', () => {

  test('of empty list is null', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toBeNull()
  })

  test('when list has only one blog equals author of that blog', () => {
    const result = listHelper.mostBlogs(listHelper.listWithOneBlog)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1
    })
  })

  test('when list has many blogs author with most blogs is returned', () => {
    const result =listHelper.mostBlogs(listHelper.initialBlogs)
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    })
  })
})

describe('mostLikes', () => {
  test('of empty list is null', () => {
    const result = listHelper.mostLikes([])
    expect(result).toBeNull()
  })

  test('when list has only one blog equals author of that blog', () => {
    const result = listHelper.mostLikes(listHelper.listWithOneBlog)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })

  test('when list has many blogs author with most blogs is returned', () => {
    const result =listHelper.mostLikes(listHelper.initialBlogs)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
})