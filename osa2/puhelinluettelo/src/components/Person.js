import React from 'react'

const Person = (props) => {
    const { name, number, removePerson } = props
    return (
        <li>{name} {number} 
          <form onSubmit={removePerson}>
            <button type="submit" name={name}>poista</button>
          </form>
        </li>
    )
}

export default Person