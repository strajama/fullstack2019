import React from 'react'

const Header = props =>
  <h1>{props.course}</h1>

const Total = ({ parts }) => {
  const t = () => parts.map(part =>
    part.exercises
  )
  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  const total = t().reduce(reducer)

  return <p>yhteensä {total} tehtävää</p>
}
  

const Part = props =>
  <p>{props.part.name} {props.part.exercises}</p>

const Rows = ({ parts }) => parts.map(part =>
    <Part
      key={part.id}
      part={part}
    />
    )

const Content = props => (
  <div>
    {Rows(props)}
  </div>
)

const Course = ({ course }) => {
    return (
        <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
        </div>

    )
}

export default Course