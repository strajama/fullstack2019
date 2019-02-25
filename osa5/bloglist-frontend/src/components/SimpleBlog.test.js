import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent  } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders content', () => {
  const blog = {
    likes: 101,
    title: 'Tämä on testi',
    author: 'testaaja'
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Tämä on testi'
  )

  const element = component.getByText('Tämä on testi testaaja')
  expect(element).toBeDefined()

  const div = component.container.querySelector('.simpleBlog')
  expect(div).toHaveTextContent(
    101
  )
})

it('clicking the button calls event handler once', async () => {
  const blog = {
    likes: 101,
    title: 'Tämä on testi',
    author: 'testaaja'
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})
