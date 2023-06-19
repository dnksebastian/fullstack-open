import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
// import { showNotification } from "../reducers/notificationReducer"
import { setNotification } from "../reducers/notificationReducer"



const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={handleClick}>vote</button>
          </div>
        </div>
    )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (!filter) {
      return anecdotes
    }
    else {
      const filterValue = filter.toLowerCase()
      const filteredAnecdotes = anecdotes.filter(a => a.content.toLowerCase().includes(filterValue))
      return filteredAnecdotes
    }
  })
  const dispatch = useDispatch()

  return (
    <>
    {anecdotes.map(anecdote => <Anecdote
    key={anecdote.id}
    anecdote={anecdote}
    handleClick={() => {
        dispatch(voteAnecdote(anecdote.id))
        // dispatch(showNotification({type: 'vote', text: anecdote.content}))
        dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
    }}
     />)}
    </>
  )
}

export default AnecdoteList
