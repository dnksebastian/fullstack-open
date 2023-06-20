import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'

import { useNotificationDispatch, useNotificationValue } from './AnecdotesContext'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'


const App = () => {

  const queryClient = useQueryClient()

  const notificationDispatch = useNotificationDispatch()
  const notificationMessage = useNotificationValue()

  const result = useQuery('anecdotes', getAnecdotes, {
    retry: 1
  })

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })
  
  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    notificationDispatch({ type: 'VOTE', payload: `anecdote '${anecdote.content}' voted` })
  }

  const anecdotes = result.data

  if (result.isLoading) {
    return <div>loading data...</div>
  } else if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      {notificationMessage && <Notification />}
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App