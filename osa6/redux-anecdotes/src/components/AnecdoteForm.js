import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationNew, clearNotification } from '../reducers/notificationReducer'
import Notification from './Notification'

const AnecdoteForm = (props) => {

  const store = props.store

  const addAnecdote = event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    store.dispatch(
      createAnecdote(content)
    )
    store.dispatch(
      notificationNew(`you added ${content}`)
    )
    setTimeout(() => {
      store.dispatch(
        clearNotification()
      )
    }, 5000)
    event.target.anecdote.value = ''
  }

  return (
    <div>
      <Notification store={props.store}/>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm