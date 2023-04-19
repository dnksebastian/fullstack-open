import { useState, useEffect } from "react";
import axios from 'axios'

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";


const App = () => {
  const [persons, setPersons] = useState([]);
  // const [persons, setPersons] = useState([
  //   { name: "Arto Hellas", number: "040-123456", id: 1 },
  //   { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
  //   { name: "Dan Abramov", number: "12-43-234345", id: 3 },
  //   { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  // ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");


  useEffect(() => {
    axios.get('http://localhost:3001/persons')
    .then(res => {
      setPersons(res.data)
    })
  }, []);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilterChange = (e) => {
    setNewFilter(e.target.value);
  };

  const contactsToDisplay = newFilter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(newFilter.toLowerCase())
      )
    : persons;

  const addPerson = (e) => {
    e.preventDefault();

    const personObj = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    let isValid = validateName();

    if (isValid) {
      setPersons(persons.concat(personObj));
      setNewName("");
      setNewNumber("");
    } else {
      return;
    }
  };

  const validateName = () => {
    if (persons.some((obj) => obj.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return false;
    } else {
      return true;
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <h3>Search contact</h3>

      <Filter filter={newFilter} filterHandler={handleFilterChange} />

      <h3>Add new number</h3>

      <PersonForm formHandler={addPerson} nameVal={newName} nameHandler={handleNameChange} numVal={newNumber} numHandler={handleNumberChange}/>
      
      <h3>Numbers</h3>
      
      <Persons persons={contactsToDisplay} />

    </div>
  );
};

export default App;
