export const newUser = (login) => {
  return async dispatch => {
    dispatch({
      type: 'LOGIN',
      data: login
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
    state.login = action.data
    return action.data
  case 'LOGOUT':
    return []
  default:
    return state
  }
}

export default reducer