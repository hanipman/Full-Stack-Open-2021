import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
	let component

	beforeEach(() => {
		const username = 'username'

		const blog = {
			title: 'title',
			author: 'author',
			url: 'url',
			likes: 1,
			user: {
				username: 'username',
				name: 'name',
				id: 'abcd1234'
			}
		}

		component = render(
			<Blog blog={blog} username={username}/>
		)
	})

	test('blog shows title and author only', () => {
		expect(component.container).toHaveTextContent('title')
		expect(component.container).toHaveTextContent('author')

		const view_button = component.getByText('view')
		expect(view_button).toBeDefined()

		expect(component.container).not.toHaveTextContent('url')
		expect(component.container).not.toHaveTextContent('likes')
		expect(component.container).not.toHaveTextContent('name')
	})
})