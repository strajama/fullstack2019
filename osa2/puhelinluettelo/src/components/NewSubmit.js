import React from 'react'


const NewSubmit = (props) => {
    const {addPerson, newName, handleNameChange, newNumber, handleNumberChange} = props
    return (
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
    )
}

export default NewSubmit