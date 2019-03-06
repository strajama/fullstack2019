import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import store from './store'
import { Provider } from 'react-redux'

// const reducer = combineReducers({
//   anecdotes: anecdoteReducer,
//   notifications: notificationReducer,
//   filter: filterReducer
// })

// const store = createStore(reducer)

// anecdoteService.getAll().then(anecdotes =>
//   store.dispatch(initializeAnecdotes(anecdotes))
// )

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)