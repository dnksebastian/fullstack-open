import PersonDetails from "./PersonDetails";

const Persons = ({persons, removePerson}) => {
    return (
        <ul>
        {persons.map((person) => (
          <PersonDetails key={person.name} name={person.name} number={person.number} id={person.id} removePerson={removePerson} />
        ))}
      </ul>
    )
}

export default Persons