import blogService from '../services/blogs'

export const getComments = (id) => {
  return async dispatch => {
    const comments = await blogService.getComments(id)
    dispatch({
      type: 'GET_COMMENTS',
      data: comments
    })
  }
}

export const postComment = (id, content) => {
  return async dispatch => {
    const comment = await blogService.postComment(id, content)
    dispatch({
      type: 'POST_COMMENT',
      data: comment
    })
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'GET_COMMENTS':
    return action.data
  case 'POST_COMMENT':
    return state.concat(action.data)
  default: return state
  }
}

export default reducer