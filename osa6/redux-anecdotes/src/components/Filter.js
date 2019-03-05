import React from 'react'
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {

  const store = props.store

  const handleChange = (event) => {
    // input-kentän arvo muuttujassa event.target.value
    const content = event.target.value
    store.dispatch(
      setFilter(content)
    )
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter