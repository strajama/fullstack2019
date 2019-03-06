
export const notificationNew = (message, time) => {
  return async dispatch => {
    dispatch({
      type: 'NOTIFICATION',
      data: message
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEARNOTIFICATION',
        data: null
      })
    }, time*1000)

  }
}

// const clearNotification = () => {
//   return {
//     type: 'CLEARNOTIFICATION',
//     data: null
//   }
// }

const reducer = (state = null, action) => {
  switch (action.type) {
  case 'NOTIFICATION':
    return action.data
  case 'CLEARNOTIFICATION':
    return null
  default:
    return state
  }
}

export default reducer