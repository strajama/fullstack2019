export const newUser = (user) => {
  return async dispatch => {
    dispatch({
      type: 'LOGIN',
      data: user
    })
  }
}

export const logout = () => {
  return async dispatch => {
    dispatch({
      type: 'LOGOUT',
      data: null
    })
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'LOGIN':
    state.user = action.data
    return action.data
  case 'LOGOUT':
    return []
  default:
    return state
  }
}

export default reducer