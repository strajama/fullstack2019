import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
    const {good, neutral, bad} = props
    const all = good + neutral + bad
    const ca = (good - bad) / all
    const pos = good / all * 100
    if (all === 0) {
        return (
            <div>
                <p>Ei yhtään palautetta annettu.</p>
            </div>
        )
    }
    return (
        <table>
            <tbody>
                <tr>
                    <td>hyvä</td>
                    <td>{good}</td>
                </tr>
                <tr>
                    <td>neutraali</td>
                    <td>{neutral}</td>
                </tr>
                <tr>
                    <td>huono</td>
                    <td>{bad}</td>
                </tr>
                <tr>
                    <td>yhteensä</td>
                    <td>{all}</td>
                </tr>
                <tr>
                    <td>keskiarvo</td>
                    <td>{ca}</td>
                </tr>
                <tr>
                    <td>positiivisia</td>
                    <td>{pos} %</td>
                </tr>  
            </tbody>          
        </table>
    )
  }

  const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>anna palautetta</h1>
      <Button handleClick={() => setGood(good + 1)}text='hyvä'/>
      <Button handleClick={() => setNeutral(neutral + 1)}text='neutraali'/>
      <Button handleClick={() => setBad(bad + 1)}text='huono'/>
      <h1>statistiikka</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
