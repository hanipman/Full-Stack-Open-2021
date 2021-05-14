import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
	query allAuthors {
		allAuthors {
			name
			born
			bookCount
		}
	}
`

export const ALL_BOOKS = gql`
	query allBooks($author: String, $genre: String) {
		allBooks(author: $author, genre: $genre) {
			title
			author {
				name
			}
			published
			genres
		}
	}
`

export const FAVORITE_GENRE = gql`
	query me {
		me {
			favoriteGenre
		}
	}
`

export const ADD_BOOK = gql`
	mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
		addBook(
			title: $title,
			author: $author,
			published: $published,
			genres: $genres
		) {
			title
			published
			author {
				name
			}
			id
			genres
		}
	}
`

export const UPDATE_AUTHOR_BORN = gql`
	mutation editAuthor($name: String!, $setBornTo: Int!) {
		editAuthor(name: $name, setBornTo: $setBornTo) {
			name
			id
			born
			bookCount
		}
	}
`

export const LOGIN = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			value
		}
	}
`

export const BOOK_ADDED = gql`
	subscription {
		bookAdded {
			title
			published
			author {
				name
			}
			id
			genres
		}
	}
`