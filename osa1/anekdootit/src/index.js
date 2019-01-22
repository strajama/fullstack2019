import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Best = (props) => {
  const votes = props.votes
  const anecdotes = props.anecdotes
  let best = 0

  for (var i = 1; i < 6; i++) {
    if (votes[best] < votes[i]) {
      best = i
    }
  }

  return (
    <div>
      <p>{anecdotes[best]}</p>
      <p>has {votes[best]} votes</p>   
    </div>
    
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Random = () => {
    const num = Math.floor((Math.random() * 6))
  return num
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(6).fill(0))

  const vote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button handleClick={() => vote()} text='vote'/>      
      <Button handleClick={() => setSelected(Random)} text='next anecdote'/>
      <h1>Anecdote with the most votes</h1>
      <Best votes={votes} anecdotes={props.anecdotes}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes}/>,
  document.getElementById('root')
)