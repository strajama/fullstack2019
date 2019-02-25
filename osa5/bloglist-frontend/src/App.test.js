import React from 'react'
import { render, waitForElement } from 'react-testing-library'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {

  it('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    )

    const blogView = component.container.querySelector('.blogView')
    expect(blogView).toBe(null)

    const loginForm = component.container.querySelector('.loginForm')
    expect(loginForm).toBeDefined()
  })

  it('if user is logged in, blogs are rendered', async () => {

    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Teuvo Testaaja'
    }

    localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

    const component = render(
      <App />
    )

    await waitForElement(
      () => component.getByText('create new')
    )

    const blogList = component.container.querySelector('.blogView')
    expect(blogList).toBeDefined()
    let blogs = component.container.querySelectorAll('.smallView')
    expect(blogs.length).toBe(1)

    const element = component.getByText('testikappale tähän')
    expect(element).toBeDefined()
  })
})

