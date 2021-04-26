import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
	let component
	let addBlogHandler

	beforeEach(() => {
		addBlogHandler = jest.fn()

		component = render(
			<BlogForm createBlog={addBlogHandler} />
		)
	})

	test('test form input correctness in callback', () => {
		const title_input = component.container.querySelector('#title_input')
		const author_input = component.container.querySelector('#author_input')
		const url_input = component.container.querySelector('#url_input')
		const form = component.container.querySelector('form')

		fireEvent.change(title_input, {
			target: { value: 'title' }
		})
		fireEvent.change(author_input, {
			target: { value: 'author' }
		})
		fireEvent.change(url_input, {
			target: { value: 'url' }
		})
		fireEvent.submit(form)

		expect(addBlogHandler.mock.calls).toHaveLength(1)
		expect(addBlogHandler.mock.calls[0][0].title).toBe('title')
	})
})