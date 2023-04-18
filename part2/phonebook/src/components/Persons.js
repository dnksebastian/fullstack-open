import PersonDetails from "./PersonDetails";

const Persons = ({persons}) => {
    return (
        <ul>
        {persons.map((person) => (
          <PersonDetails key={person.name} name={person.name} number={person.number}/>
        ))}
      </ul>
    )
}

export default Persons