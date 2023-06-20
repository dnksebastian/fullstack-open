import { useMutation, useQueryClient } from 'react-query'
import { addAnecdote } from '../requests'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation(addAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
    },
    onError: (err) => {
      console.log('something went wrong');
    }
  })

    const onCreate = (event) => {
      event.preventDefault()
      const content = event.target.anecdote.value
      event.target.anecdote.value = ''
      const newAnecdoteObj = {
        content: content,
        votes: 0
      }
      newAnecdoteMutation.mutate(newAnecdoteObj)
  }
  
    return (
      <div>
        <h3>create new</h3>
        <form onSubmit={onCreate}>
          <input name='anecdote' />
          <button type="submit">create</button>
        </form>
      </div>
    )
  }
  
  export default AnecdoteForm