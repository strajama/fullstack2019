import userService from '../services/users'

// export const like = (id, blog) => {
//   return async dispatch => {
//     blog = { ...blog, likes: blog.likes + 1 }
//     const updatedblog = await blogService.update(id, blog)
//     dispatch({
//       type: 'LIKE',
//       data: updatedblog
//     })
//   }
// }


export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
  //   case 'LIKE':
  //     // eslint-disable-next-line no-case-declarations
  //     const blogToLike = state.find(n => n.id === action.data.id)
  //     // eslint-disable-next-line no-case-declarations
  //     const likedBlog = {
  //       ...blogToLike,
  //       likes: blogToLike.likes + 1
  //     }
  //     return state.map(blog =>
  //       blog.id !== action.data.id ? blog : likedBlog
  //     )
  case 'INIT_USERS':
    return action.data

  default: return state
  }
}

export default reducer