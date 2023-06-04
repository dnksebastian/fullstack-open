import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test.only('form calls event handler received as props with right details when new blog is created', async () => {
  const newBlog = jest.fn()
  const user = userEvent.setup()

  const { container } = render(<BlogForm createBlog={newBlog}/>)

  const titleInput = container.querySelector('.title-input')
  const authorInput = container.querySelector('.author-input')
  const urlInput = container.querySelector('.url-input')

  await user.type(titleInput, 'Testing blog')
  await user.type(authorInput, 'Anonymous')
  await user.type(urlInput, 'google.com')

  const btn = screen.getByText('create')
  await user.click(btn)

  expect(newBlog.mock.calls).toHaveLength(1)
  expect(newBlog.mock.calls[0][0].title).toBe('Testing blog')
  expect(newBlog.mock.calls[0][0].author).toBe('Anonymous')
  expect(newBlog.mock.calls[0][0].url).toBe('google.com')
})