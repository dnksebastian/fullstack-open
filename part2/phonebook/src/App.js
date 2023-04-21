import { useState, useEffect } from "react";
import personService from "./services/persons";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import SuccessNotification from "./components/SuccessNotification";
import ErrorNotification from "./components/ErrorNotification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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

  const addPerson = () => {
    const personObj = {
      name: newName,
      number: newNumber,
    };

    personService.create(personObj).then((returnedPersons) => {
      setPersons(persons.concat(returnedPersons));
    });

    displaySuccess("Added", personObj.name);
  };

  const validateName = () => {
    if (
      persons.some((obj) => obj.name.toLowerCase() === newName.toLowerCase())
    ) {
      return true;
    } else {
      return false;
    }
  };

  const updatePerson = async () => {
    const personToUpdate = persons.find(
      (p) => p.name.toLowerCase() === newName.toLowerCase()
    );
    const changedPerson = { ...personToUpdate, number: newNumber };

    try {
      const updatedPerson = await personService.update(
        personToUpdate.id,
        changedPerson
      );
      setPersons(
        persons.map((person) => {
          return person.id === updatedPerson.id ? updatedPerson : person;
        })
      );
      displaySuccess("Updated", updatedPerson.name);
    } catch (err) {
      // console.log(err);
      displayError("removed", changedPerson.name);
    }
  };

  const removePerson = async (id) => {
    const delPerson = persons.find((person) => person.id === id);

    if (window.confirm(`Do you really want to delete ${delPerson.name}?`)) {
      await personService.removeContact(id);

      const readContacts = await personService.getAll();
      console.log(readContacts);

      setPersons([...readContacts]);
    }
  };

  const displaySuccess = (action, name) => {
    setSuccessMessage(`${action} ${name}`);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };

  const displayError = (action, name) => {
    if (action === "removed") {
      setErrorMessage(
        `Information of ${name} has already been removed from server`
      );
    } else {
      setErrorMessage(`Could not add or change data for ${name}.`);
    }
    setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
  };

  const submitForm = (e) => {
    e.preventDefault();
    let nameExists = validateName();

    console.log(nameExists);

    if (nameExists) {
      let userWantsUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      console.log(userWantsUpdate);

      if (userWantsUpdate) {
        console.log("updating persons...");
        updatePerson();
        setNewName("");
        setNewNumber("");
      } else {
        console.log(`${newName} is already in the phonebook!`);
        return;
      }
    } else {
      console.log("adding person...");
      addPerson();
      setNewName("");
      setNewNumber("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <SuccessNotification message={successMessage} />
      <ErrorNotification message={errorMessage} />

      <h3>Search contact</h3>

      <Filter filter={newFilter} filterHandler={handleFilterChange} />

      <h3>Add new number</h3>

      <PersonForm
        formHandler={submitForm}
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
