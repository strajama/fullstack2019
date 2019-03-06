import React, { useEffect } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import CreateNew from './components/CreateNew'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import { notificationNew } from './reducers/notificationReducer'
import { connect } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { newUser, logout } from './reducers/userReducer'
import UserForm from './components/UserForm'

const App = (props) => {

  useEffect(() => {
    props.initializeBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.newUser(user)
      blogService.setToken(user.token)
    }
  }, [window.localStorage])

  if (props.user === null || props.user.length === 0 ) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <UserForm />
      <BlogList />
      <Togglable buttonLabel='create new'>
        <CreateNew />
      </Togglable>
    </div>
  )

}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  notificationNew, initializeBlogs, newUser, logout
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default ConnectedApp

// export default connect(null, { notificationNew, initializeBlogs, newUser  })(App)