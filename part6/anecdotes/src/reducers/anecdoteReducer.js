import { createSlice } from '@reduxjs/toolkit'
import anecoteService from '../services/anecdotes'

  const anecdotesSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
      appendAnecdote(state, action) {
        state.push(action.payload)
      },
      setAnecdotes(state, action) {
        const anecdotesArr = action.payload
        const sortedByLikes = anecdotesArr.sort((prev, next) => next.votes - prev.votes)
        return sortedByLikes
      }
    }
  })

export const { appendAnecdote, setAnecdotes } = anecdotesSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const currentAnecdotes = getState().anecdotes
    const anecdoteToVote = currentAnecdotes.find(a => a.id === id)
    const votedAnecdote = {...anecdoteToVote, votes: anecdoteToVote.votes + 1}
    const updatedA = await anecoteService.updateOne(id, votedAnecdote)
    const updatedAnecdotes = currentAnecdotes.map(anecdote => anecdote.id !== id ? anecdote : updatedA)
    dispatch(setAnecdotes(updatedAnecdotes))
  }
}

export default anecdotesSlice.reducer