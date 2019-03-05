
export const notificationNew = (message) => {
  return {
    type: 'NOTIFICATION',
    data: message
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEARNOTIFICATION',
    data: null
  }
}

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