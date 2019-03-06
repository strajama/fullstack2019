import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationNew, clearNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {

  const addAnecdote = event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    props.createAnecdote(content)
    props.notificationNew(`you added ${content}`)
    setTimeout(() => {
      props.clearNotification()
    }, 5000)
    event.target.anecdote.value = ''
  }

  return (
    <div>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes
  }
}

const mapDispatchToProps = {
  createAnecdote, notificationNew, clearNotification
}

const ConnectedAnecdoteForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm