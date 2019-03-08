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
import UserList from './components/UserList'
import LoginForm from './components/LoginForm'
import CreateNew from './components/CreateNew'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import Menu from './components/Menu'
import User from './components/User'
import Blog from './components/Blog'


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

  const userById = (id) =>
    props.users.find(a => a.id === id)

  const blogById = (id) =>
    props.blogs.find(a => a.id === id)

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
      <Router>
        <div>
          <Menu />
          < Notification />
          <Route exact path="/blogs" render={() =>
            <BlogList />
          } />
          <Route exact path="/blogs/:id" render={({ match }) =>
            <Blog blog={blogById(match.params.id)} />
          } />
          <Route exact path="/users" render={() =>
            <UserList />
          } />
          <Route exact path="/users/:id" render={({ match }) =>
            <User user={userById(match.params.id)} />
          } />
          <Route exact path="/" render={() =>
            <CreateNew />
          } />
        </div>
      </Router>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    users: state.users,
    blogs: state.blogs,
    comments: state.comments
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