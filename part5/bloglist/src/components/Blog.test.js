import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('Blog element renders title and author, not details', () => {
  const blogpost = {
    title: 'Test blogpost',
    author: 'Anonymous',
    url: 'google.com',
    likes: 0
  }

  const { container } = render(<Blog blog={blogpost}/>)
  const div = container.querySelector('.blogpost')

  expect(div).toHaveTextContent(`${blogpost.title}`)
  expect(div).toHaveTextContent(`${blogpost.author}`)
  expect(div).not.toHaveTextContent(`${blogpost.url}`)
  expect(div).not.toHaveTextContent(`${blogpost.likes}`)
})

test('blog URL and likes are shown after details button clicked', async () => {
  const user = {
    username: 'anonymous',
    name: 'Anonymous'
  }

  const blogpost = {
    title: 'Test blog',
    author: 'Anonymous',
    url: 'google.com',
    likes: 0,
    user: { ...user }
  }

  const { container } = render(<Blog blog={blogpost} user={user}/>)

  const userAgent = userEvent.setup()
  const btn = screen.getByText('view')

  await userAgent.click(btn)

  expect(container).toHaveTextContent(`${blogpost.url}`)
  expect(container).toHaveTextContent(`${blogpost.likes}`)
  const hideBtn = screen.getByText('hide')
  expect(hideBtn).toBeInTheDocument()
})


test('if like button is clicked twice, event handler is called twice', async () => {
  const user = {
    username: 'anonymous',
    name: 'Anonymous'
  }

  const blogpost = {
    title: 'Test blog',
    author: 'Anonymous',
    url: 'google.com',
    likes: 0,
    user: { ...user }
  }

  const mockHandler = jest.fn()
  const userAgent = userEvent.setup()

  render(<Blog blog={blogpost} user={user} handleLikes={mockHandler}/>)

  const viewBtn = screen.getByText('view')
  await userAgent.click(viewBtn)

  const likeBtn = screen.getByText('like')
  await userAgent.click(likeBtn)
  await userAgent.click(likeBtn)

  expect(mockHandler.mock.calls).toHaveLength(2)
})