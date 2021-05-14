import React, { useEffect, useState } from 'react'
import { useLazyQuery, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from '../queries'

const Books = (props) => {
  const [filter, setFilter] = useState('')
  const [unique_genres, setUniqueGenres] = useState([])
  const [getAllBooks, result] = useLazyQuery(ALL_BOOKS, { fetchPolicy: 'cache-and-network' })

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      // if (filter !== '') {
        getAllBooks(filter === '' ? null : { variables: { genre: filter } })
      // }
    }
  })

  useEffect(() => {
    getAllBooks()
  }, []) //eslint-disable-line

  useEffect(() => {
    if (result.data) {
      let temp = unique_genres
      for (let i = 0; i < result.data.allBooks.length; i++) {
        temp = temp.concat(result.data.allBooks[i].genres)
      }
      temp = [...new Set(temp)].sort()
      setUniqueGenres(temp)
    }
  }, [result]) //eslint-disable-line

  useEffect(() => {
    getAllBooks(filter === '' ? null : { variables: { genre: filter } })
  }, [filter]) //eslint-disable-line

  if (!props.show) {
    return null
  }
  return (
    <div>
      <h2>books</h2>
      {unique_genres.map(g => 
        <button key={g} value={g} onClick={(e) => setFilter(e.target.value)}>{g}</button>  
      )}
      <button value={''} onClick={(e) => setFilter(e.target.value)}>all</button>
      <div>Filter by: {filter !== '' ? filter : 'all'}</div>
      {result.loading ?
      <div>
        loading
      </div> :
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
          {result.data.allBooks
            .map(b =>
              <tr key={b.title}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            )
          }
        </tbody>
      </table>
      }
    </div>
  )
}

export default Books