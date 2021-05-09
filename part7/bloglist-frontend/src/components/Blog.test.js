import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
	let component
	let removeHandler, likeHandler

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

		removeHandler = jest.fn()
		likeHandler = jest.fn()

		component = render(
			<Blog blog={blog} handleLike={likeHandler} removeBlog={removeHandler} username={username}/>
		)
	})

	test('blog shows title and author only', () => {
		expect(component.container).toHaveTextContent('title')
		expect(component.container).toHaveTextContent('author')

		const view_button = component.getByText('view')
		expect(view_button).toBeDefined()

		expect(component.container).not.toHaveTextContent('url')
		expect(component.container).not.toHaveTextContent('likes 1')
		expect(component.container).not.toHaveTextContent('name')
	})

	test('blog shows url, likes, and name after button click', () => {
		const view_button = component.getByText('view')
		fireEvent.click(view_button)

		expect(component.container).toHaveTextContent('url')
		expect(component.container).toHaveTextContent('likes 1')
		expect(component.container).toHaveTextContent('name')
	})

	test('when like button is clicked twice, handler is called twice', () => {
		const view_button = component.getByText('view')
		fireEvent.click(view_button)
		const like_button = component.getByText('like')
		fireEvent.click(like_button)
		fireEvent.click(like_button)

		expect(likeHandler.mock.calls).toHaveLength(2)
	})
})