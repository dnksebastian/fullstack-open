import { useState, useEffect } from "react";
import personService from "./services/persons";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
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
    };

    let isValid = validateName();

    if (isValid) {
      personService.create(personObj).then((returnedPersons) => {
        setPersons(persons.concat(returnedPersons));
        setNewName("");
        setNewNumber("");
      });
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

  const removePerson = async (id) => {
    await personService.removeContact(id);
    
    const readContacts = personService.getAll();
    readContacts.then((updatedContacts) => {
      console.log(updatedContacts);
      setPersons(updatedContacts);
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <h3>Search contact</h3>

      <Filter filter={newFilter} filterHandler={handleFilterChange} />

      <h3>Add new number</h3>

      <PersonForm
        formHandler={addPerson}
        nameVal={newName}
        nameHandler={handleNameChange}
        numVal={newNumber}
        numHandler={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons persons={contactsToDisplay} removePerson={removePerson} />
    </div>
  );
};

export default App;
