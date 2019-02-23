import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import CreateNew from './components/CreateNew'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState({message: null})
  const [user, setUser] = useState(null) 

  const notify = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => setNotification({ message: null }), 10000)
  }

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
      notify('wrong username or password', 'error')
      return false
    }
  }

  const createNew = async blog => {
    try {
      const savedBlog = await blogService.create(blog)
      setBlogs(blogs.concat(savedBlog))
      notify('blog added', 'success')
      return true
    } catch (error) {
      notify(error.message, 'error')
      return false
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      console.log('blogservicen token asetettu')
    }
  }, [])

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
          <Notification notification={notification} />
          <LoginForm login={login}/>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <p>{user.name} logged in</p>
      <p><button onClick={handleLogout}>Log out</button></p>
      <CreateNew createNew={createNew}/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App