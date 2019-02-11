import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import NewSubmit from './components/NewSubmit'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilter ] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initial => {
        setPersons(initial)        
      })
  }, [])
/*
  const filterPerson = () => {
    if (filterName) {
      return persons.filter(p => {
        p.name.toLowerCase().includes(filterName.toLowerCase())
      })
    }
    return persons
  }*/

  const filterPerson= filterName.length === 0
  ? persons 
  : persons.filterName(p => p.name.toLowerCase().includes(filterName.toLowerCase()) )

  const rows = () => filterPerson().map(person =>
    <Person
      key={person.id}
      name={person.name}
      number={person.number}
      removePerson={(event) => removePerson(event, person.name, person.id)}
    />
  )

  const addPerson = (event) => {
    event.preventDefault()
    const oldPerson = persons.find(person => person.name === newName)
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (oldPerson) {    
      const confirm = window.confirm(`${newName} on jo luettelossa, korvataanko vanha numero uudella?`)
      if (confirm) {
        personService
//        .update(oldPerson.id, personObject)
        .replace({ ...oldPerson, number: newNumber})
        .then(returnedPerson => {
//          persons.splice(oldPerson.id-1,1)
//          setPersons(persons.concat(returnedPerson))
          setPersons(persons.map(p => p.name === newName ? returnedPerson : p))
          setNewName('')
            setNewNumber('')
            setMessage(`Päivitettiin ${newName}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
        })
        .catch(error => {
          setMessage(error.response.data)
          console.log()
          })
      } else {
        setMessage(`${newName} ei päivitetty uuteen.`)
      }
        
      
    } else { personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setMessage(`Lisättiin ${newName}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(error => setMessage('jotain meni pieleen'))
    }
  }

  const removePerson = (event, name, id) => {
    event.preventDefault()
    const confirm = window.confirm(`Poistetaanko ${name}`)
    if (confirm) {
      personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
        setMessage(`${name} on poistettu.`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
        console.log(error)
        error.message.includes('404')
        ? setMessage(`${name} on jo poistettu.`)
        : setMessage('jotain meni pieleen')
      })
    }
  }
  
  const handleNameChange = (event) => {setNewName(event.target.value)}
  const handleNumberChange = (event) => {setNewNumber(event.target.value)}
  const handleFilterChange = (event) => {setFilter(event.target.value)}

  return (
    <div>
      <h1>Puhelinluettelo</h1>
      <Notification message={message}/>
      <Filter filterName={filterName} handleFilterChange={handleFilterChange} />
      <h2>Lisää uusi</h2>
      <NewSubmit addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />    
      <h2>Numerot</h2>
        <ul>
          {rows()}
        </ul>
    </div>
  )

}

export default App