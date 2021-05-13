import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [filter, setFilter] = useState('')
  const result = useQuery(ALL_BOOKS)
  let unique_genres = []

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
  else {
    for (let i = 0; i < result.data.allBooks.length; i++) {
      unique_genres = unique_genres.concat(result.data.allBooks[i].genres)
    }
    unique_genres = [...new Set(unique_genres)]
  }
  return (
    <div>a
      <h2>books</h2>
      {unique_genres.map(g => 
        <button key={g} value={g} onClick={(e) => setFilter(e.target.value)}>{g}</button>  
      )}
      <button value={''} onClick={(e) => setFilter(e.target.value)}>all</button>
      <div>Filter by: {filter !== '' ? filter : 'all'}</div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {result.data.allBooks.filter(b => filter !== '' ? b.genres.includes(filter) : b).map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books