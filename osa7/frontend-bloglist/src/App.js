import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'
import blogService from './services/blogs'
import { notificationNew } from './reducers/notificationReducer'
import { initializeUsers } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { newUser, logout } from './reducers/loginReducer'
import UserForm from './components/UserForm'
import UserList from './components/UserList'
import LoginForm from './components/LoginForm'
import CreateNew from './components/CreateNew'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import Menu from './components/Menu'


const App = (props) => {

  useEffect(() => {
    props.initializeBlogs()
  }, [])

  useEffect(() => {
    props.initializeUsers()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const login = JSON.parse(loggedUserJSON)
      props.newUser(login)
      blogService.setToken(login.token)
    }
  }, [window.localStorage])

  if (props.login === null || props.login.length === 0 ) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div className="container">
      <h2>blogs app</h2>
      <Router>
        <div>
          <Menu />
          < Notification />
          <UserForm />
          <Route exact path="/blogs" render={() =>
            <BlogList />
          } />
          <Route path="/users" render={() =>
            <UserList />
          } />
          <Route path="/" render={() =>
            <Togglable buttonLabel='create new blog'>
              <CreateNew />
            </Togglable>
          } />
        </div>
      </Router>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    login: state.login
  }
}

const mapDispatchToProps = {
  notificationNew, initializeBlogs, initializeUsers, newUser, logout
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default ConnectedApp