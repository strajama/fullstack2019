import React, { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Martti Tienari', number: '040-123456' },
    { name: 'Arto Järvinen', number: '040-123456' },
    { name: 'Lea Kutvonen', number: '040-123456' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilter ] = useState('')

  const makeFilter = () => {

    let newPersons = []    
    for (let value of persons.values()) {
      if (value.name.includes(filterName)) {
        newPersons = newPersons.concat(value)
      }
    }
    return newPersons
  }

  const filterPerson = filterName
  ? makeFilter()
  : persons

  const rows = () => filterPerson.map(person =>
    <Person
      key={person.name}
      name={person.name}
      number={person.number}
    />
  )

  const isTherePerson = (props) => {
    for (let value of persons.values()) {
      if (value.name === props.name) {
        return true
      }
    }
    return false
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    isTherePerson(personObject)
    ? alert(`${newName} on jo luettelossa`)
    : setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <form method="post">
        <div>
          rajaa näytettäviä 
          <input value={filterName} onChange={handleFilterChange}/>
        </div>
      </form>

      <h3>Lisää uusi</h3>
      <form onSubmit={addPerson} method="post">
        <div>
          nimi: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          numero: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
      <h3>Numerot</h3>
        <ul>
          {rows()}
        </ul>
    </div>
  )

}

export default App