import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
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

		const mockHandler = jest.fn()

		component = render(
			<Blog blog={blog} removeBlog={mockHandler} username={username}/>
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

	test('blog shows url, likes, and name after button click', () => {
		const view_button = component.getByText('view')
		fireEvent.click(view_button)

		expect(component.container).toHaveTextContent('url')
		expect(component.container).toHaveTextContent('likes')
		expect(component.container).toHaveTextContent('name')
	})
})