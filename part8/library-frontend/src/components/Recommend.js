import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, FAVORITE_GENRE } from '../queries'

const Recommend = ({ show }) => {
  const genre_result = useQuery(FAVORITE_GENRE)
  const booklist_result = useQuery(ALL_BOOKS)

  if (!show) {
    return null
  }

  if (genre_result.loading || booklist_result.loading) {
    return (
      <div>
        loading...
      </div>
    )
  }
  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genres {genre_result.data.me.favoriteGenre}</p>
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
          {booklist_result.data.allBooks
            .filter(b => b.genres.includes(genre_result.data.me.favoriteGenre))
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
    </div>
  )
}

export default Recommend