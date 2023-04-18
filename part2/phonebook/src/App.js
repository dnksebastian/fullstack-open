import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')


  const handleNameChange = (e) => {
    setNewName(e.target.value)
  };


  const addPerson = (e) => {
    e.preventDefault();
    console.log('adding person');

    const personObj = {
      name: newName,
      id: persons.length + 1
    }

    let isValid = validateName();

    if (isValid) {
      setPersons(persons.concat(personObj))
      setNewName("")
    } else {
      return
    }
  }

  const validateName = () => {
    if (persons.some(obj => obj.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return false;
    } else {
      return true
    }
  }

  

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>        
      {persons.map((person) => <li key={person.name}>{person.name}</li>)}
      </ul>

      <div>debug: {newName}</div>
    </div>
  )
}

export default App
