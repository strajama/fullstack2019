import React from 'react'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'
import { connect } from 'react-redux'
import { like, remove } from '../reducers/blogReducer'
import { notificationNew } from '../reducers/notificationReducer'

import Blog from './Blog'

const BlogList = (props) => {

  const addLike = async (id, blog) => {
    try {
      await props.like(id, blog)
      await props.notificationNew(`you liked ${blog.title}`, 5)
    } catch (error) {
      await props.notificationNew(error.message, 5)
    }

  }

  const removeBlog = async (blog) => {
    const ok = window.confirm(`remove blog "${blog.title}" by ${blog.author}?`)
    if (ok) {
      try {
        props.remove(blog.id)
        props.notificationNew(`${blog.title} was removed`, 5)
      } catch (error) {
        props.notificationNew(error.message, 5)
      }
    }
  }


  return (
    <div>
      <ul>
        {props.visibleBlogs.map(blog =>
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              <Blog key={blog.id} blog={blog} addLike={addLike} removeBlog={removeBlog}/>
            </Link>
          </li>
        )}
      </ul>

    </div>
  )
}

const blogsToShow = ({ blogs }) => {
  return blogs.sort((a, b) => b.likes - a.likes)
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    visibleBlogs: blogsToShow(state)
  }
}

const mapDispatchToProps = {
  like, notificationNew, remove
}

const ConnectedBlogList = connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogList)

export default ConnectedBlogList