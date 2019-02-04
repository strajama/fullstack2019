import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person'
import Filter from './components/Filter'
import NewSubmit from './components/NewSubmit'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilter ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const filterPerson = () => {
    let newPersons = []    
    for (let value of persons.values()) {
      if (value.name.includes(filterName)) {
        newPersons = newPersons.concat(value)
      }
    }
    return newPersons
  }

  const rows = () => filterPerson().map(person =>
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
      <Filter filterName={filterName} handleFilterChange={handleFilterChange}/>

      <h3>Lisää uusi</h3>
      <NewSubmit addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h3>Numerot</h3>
        <ul>
          {rows()}
        </ul>
    </div>
  )

}

export default App