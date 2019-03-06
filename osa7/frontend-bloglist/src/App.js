import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import CreateNew from './components/CreateNew'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import { notificationNew } from './reducers/notificationReducer'
import { connect } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'

const App = (props) => {
  const [user, setUser] = useState(null)

  const notify = (message, colorType, time) => {
    props.notificationNew( message, time)
  }

  useEffect(() => {
    props.initializeBlogs()
  }, [])

  const login = async logUser => {
    try {
      const user = await loginService.login(logUser)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      return true
    } catch (error) {
      notify('wrong username or password', 'error', 5)
      return false
    }
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [window.localStorage])

  const handleLogout = event => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
    blogService.setToken('')
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm login={login}/>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>{user.name} logged in</p>
      <p><button onClick={handleLogout} className='handleLogout'>Log out</button></p>
      <BlogList />
      <Togglable buttonLabel='create new'>
        <CreateNew />
      </Togglable>
    </div>
  )

}

export default connect(null, { notificationNew, initializeBlogs  })(App)