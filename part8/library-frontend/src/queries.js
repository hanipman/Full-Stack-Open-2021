import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
	query {
		allAuthors {
			name
			born
			bookCount
		}
	}
`

export const ALL_BOOKS = gql`
	query {
		allBooks {
			title
			author
			published
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
			author
			id
			genres
		}
	}
`

export const UPDATE_AUTHOR_BORN = gql`
	mutation editAuthor($name: String!, $born: Int!) {
		editAuthor(name: $name, setBornTo: $born) {
			name
			id
			born
			bookCount
		}
	}
`