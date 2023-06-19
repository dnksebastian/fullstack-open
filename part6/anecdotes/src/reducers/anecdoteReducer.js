import { createSlice } from '@reduxjs/toolkit'

  const anecdotesSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
      addAnecdote(state, action) {
        state.push(action.payload)
      },
      voteAnecdote(state, action) {
        const anecdoteID = action.payload
        const anecdoteToVote = state.find(a => a.id === anecdoteID)
        const changedAnegdote = {
          ...anecdoteToVote,
          votes: anecdoteToVote.votes + 1
        }
        return state.map(anecdote => anecdote.id !== anecdoteID ? anecdote : changedAnegdote).sort((prev, next) => next.votes - prev.votes)
      },
      appendAnecdote(state, action) {
        state.push(action.payload)
      },
      setAnecdotes(state, action) {
        return action.payload
      }
    }
  })

export const { voteAnecdote, addAnecdote, appendAnecdote, setAnecdotes } = anecdotesSlice.actions
export default anecdotesSlice.reducer