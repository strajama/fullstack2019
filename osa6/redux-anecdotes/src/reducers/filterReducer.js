export const setFilter = (filter) => {
  return {
    type: 'SET_FILTER',
    filter: filter
  }
}

const reducer = (state = 'ALL', action) => {
  switch (action.type) {
  case 'SET_FILTER':
    return action.filter
  default:
    return state
  }
}

export default reducer