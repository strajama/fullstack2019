import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import NewSubmit from './components/NewSubmit'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilter ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialNotes => {
        setPersons(initialNotes)
      })
  }, [])

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
      key={person.id}
      name={person.name}
      number={person.number}
      removePerson={() => removeThePerson(person.name, person.id)}
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
    ? alert(`${newName} on jo luettelossa, korvataanko vanha numero uudella?`)     
    : personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const removeThePerson = (name, id) => {
    if (window.confirm(`Poistetaanko ${name}`)) {
      personService
      .remove(id)
      .then(initialNotes => {
        setPersons(initialNotes)
      })
    }
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