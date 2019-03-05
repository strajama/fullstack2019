import React from 'react'
import { voteFor } from '../reducers/anecdoteReducer'
import { notificationNew, clearNotification } from '../reducers/notificationReducer'


const AnecdoteList = (props) => {

  const store = props.store
  let anecdotes = store.getState().anecdotes
  const filterWith = store.getState().filter

  if (filterWith !== 'ALL') {
    anecdotes = anecdotes.filter(a => a.content.toLowerCase().includes(filterWith.toLowerCase()))
  }

  const vote = (id, content) => {
    store.dispatch(
      voteFor(id)
    )
    store.dispatch(
      notificationNew(`you voted for ${content}`)
    )
    setTimeout(() => {
      store.dispatch(
        clearNotification()
      )
    }, 5000)
  }


  return (
    <div>
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList