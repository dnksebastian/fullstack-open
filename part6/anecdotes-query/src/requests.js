import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => axios.get(baseUrl).then(res => res.data)

export const addAnecdote = newAnecdote =>
    axios.post(baseUrl, newAnecdote).then(res => res.data).catch((err) => {
        throw new Error('unable to add new Anecdote')
    })

export const updateAnecdote = updatedAnecdote =>
    axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote).then(res => res.data)