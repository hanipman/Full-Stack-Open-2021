import anecdotesService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(a => a.id === id)
      const new_anecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      const new_states = state.map(anecdote => anecdote.id !== id ? anecdote : new_anecdote)
      return new_states.sort((a, b) => b.votes - a.votes)
    case 'NEW_ANECDOTE':      
      return [...state, action.data]
    case 'INITIALIZE':
      return action.initialState
    default:
      return state
  }
}

export const incrementVote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.create({ content, id: getId(), votes: 0})
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const initialState = await anecdotesService.getAll()
    dispatch({
      type: 'INITIALIZE',
      initialState
    })
  }
}

export default anecdoteReducer