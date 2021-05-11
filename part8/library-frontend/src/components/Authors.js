import React, { useEffect, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_AUTHOR_BORN } from '../queries'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const result = useQuery(ALL_AUTHORS)
  const [ editAuthor, update_result ] = useMutation(UPDATE_AUTHOR_BORN, {
    refetchQueries: [ { query: ALL_AUTHORS }],
    onError: (error) => {
      props.setError(error.message)
    }
  })

  useEffect(() => {
    if (update_result.data && update_result.data.editAuthor === null) {
      props.setError('author not found')
    }
  }, [update_result.data]) // eslint-disable-line

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return (
      <div>
        loading...
      </div>
    )
  }

  const submit = (e) => {
    e.preventDefault()
  
    const date = parseInt(born)
    editAuthor({ variables: { name, setBornTo: date } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {result.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <br />
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        {/* name
        <input
          value={name}
          onChange={({ target }) => setName(target.value)}
        /> */}
        <select defaultValue='default' onChange={({ target }) => setName(target.value)}>
          <option disabled value='default'> -- select an option -- </option>
          {result.data.allAuthors.map(a =>
            <option key={a.name}>{a.name}</option>
          )}
        </select>
        <br />
        born
        <input
          type='number'
          value={born}
          onChange={({ target }) => setBorn(target.value)}
        />
        <br />
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
