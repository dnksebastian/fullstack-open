const PersonDetails = ({name, number, id, removePerson}) => {
    return (
        <li>{name} {number} <button onClick={() => removePerson(id)}>delete</button> </li>
    )
};

export default PersonDetails