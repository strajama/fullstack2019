import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent  } from 'react-testing-library'
import Blog from './Blog'

afterEach(cleanup)

test('without clicking blog shows only title and author', () => {
  const blog = {
    likes: 101,
    title: 'Tämä on testi',
    author: 'testaaja'
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Tämä on testi'
  )

  const element = component.getByText('Tämä on testi testaaja')
  expect(element).toBeDefined()

  const div = component.container.querySelector('.blogView')
  expect(div).toHaveTextContent(
    'Tämä on testi testaaja'
  )
})

it('clicking the text shows full information', async () => {
  const blog = {
    likes: 101,
    title: 'Tämä on testi',
    author: 'testaaja'
  }

  const mockHandler = jest.fn()
  const component = render(
    <Blog blog={blog} onClick={mockHandler} />
  )

  const blogView = component.container.querySelector('.blogView')
  fireEvent.click(blogView)

  expect(blogView).toHaveTextContent(
    'Tämä on testi testaaja101 likes Like Remove'
  )
})