import blogService from '../services/blogs'

export const like = (id, blog) => {
  return async dispatch => {
    blog = { ...blog, likes: blog.likes + 1 }
    const updatedblog = await blogService.update(id, blog)
    dispatch({
      type: 'LIKE',
      data: updatedblog
    })
  }
}

export const remove = id => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE',
      data: null
    })
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'LIKE':
    // eslint-disable-next-line no-case-declarations
    const blogToLike = state.find(n => n.id === action.data.id)
    // eslint-disable-next-line no-case-declarations
    const likedBlog = {
      ...blogToLike,
      likes: blogToLike.likes + 1
    }
    return state.map(blog =>
      blog.id !== action.data.id ? blog : likedBlog
    )
  case 'NEW_BLOG':
    return state.concat(action.data)
  case 'INIT_BLOGS':
    return action.data
  case 'REMOVE':
    return state
  default: return state
  }
}

export default reducer