import React from 'react'
import { like, remove } from '../reducers/blogReducer'
import { notificationNew } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
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
      <p>blogilistatulostus</p>
      {props.visibleBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} addLike={addLike} removeBlog={removeBlog}/>
      )}
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