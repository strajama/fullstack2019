const helper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = helper.dummy(blogs)
  expect(result).toBe(1)
})

describe('totalLikes', () => {

  test('of empty list is zero', () => {
    const result = helper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = helper.totalLikes(helper.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = helper.totalLikes(helper.initialBlogs)
    expect(result).toBe(36)
  })
})

describe('favoriteBlog', () => {

  test('of empty list is null', () => {
    const result = helper.favoriteBlog([])
    expect(result).toBeNull()
  })

  test('when list has only one blog equals that blog', () => {
    const result = helper.favoriteBlog(helper.listWithOneBlog)
    expect(result).toEqual(helper.listWithOneBlog[0])
  })

  test('when list has many blogs the most liked is returned', () => {
    const result = helper.favoriteBlog(helper.initialBlogs)
    expect(result).toEqual(helper.initialBlogs[2])
  })
})

describe('mostBlogs', () => {

  test('of empty list is null', () => {
    const result = helper.mostBlogs([])
    expect(result).toBeNull()
  })

  test('when list has only one blog equals author of that blog', () => {
    const result = helper.mostBlogs(helper.listWithOneBlog)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1
    })
  })

  test('when list has many blogs author with most blogs is returned', () => {
    const result =helper.mostBlogs(helper.initialBlogs)
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    })
  })
})

describe('mostLikes', () => {
  test('of empty list is null', () => {
    const result = helper.mostLikes([])
    expect(result).toBeNull()
  })

  test('when list has only one blog equals author of that blog', () => {
    const result = helper.mostLikes(helper.listWithOneBlog)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })

  test('when list has many blogs author with most blogs is returned', () => {
    const result =helper.mostLikes(helper.initialBlogs)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
})