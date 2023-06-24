import { useResource, useField } from './hooks'
import { useEffect } from 'react'


const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  console.log('rendered');

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  useEffect(() => {
      noteService.getAll()
      personService.getAll()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.fieldProps.value })
    content.resetAll()
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.fieldProps.value, number: number.fieldProps.value})
    name.resetAll()
    number.resetAll()
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content.fieldProps} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name.fieldProps} /> <br/>
        number <input {...number.fieldProps} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App