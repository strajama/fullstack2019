import React from 'react'

const Statistics = (props) => {
  const { good, neutral, bad } = props
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

export default Statistics