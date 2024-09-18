const PersonForm = ({formHandler, nameVal, nameHandler, numVal, numHandler}) => {
    return (
        <form onSubmit={formHandler}>
        <div>
          name: <input value={nameVal} onChange={nameHandler} />
        </div>
        <div>
          number: <input value={numVal} onChange={numHandler} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm