import React from 'react'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'
import { connect } from 'react-redux'
import { like, remove } from '../reducers/blogReducer'
import { notificationNew } from '../reducers/notificationReducer'

const BlogList = (props) => {

  return (
    <div>
      <ul>
        {props.visibleBlogs.map(blog =>
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title}
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