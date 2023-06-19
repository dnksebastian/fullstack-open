import { useDispatch } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"

import { createAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const addNewAnec = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ""
    dispatch(createAnecdote(content))
    dispatch(setNotification(`you added '${content}'`, 5))
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addNewAnec}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
