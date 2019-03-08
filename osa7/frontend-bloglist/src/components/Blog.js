import React from 'react'
import { connect } from 'react-redux'
import { notificationNew } from '../reducers/notificationReducer'
import { like, remove } from '../reducers/blogReducer'
import Comment from './Comment'
import { Form, Button } from 'react-bootstrap'

const Blog = ( props ) => {

  if ( props.blog === undefined) {
    return null
  }
  const blog = props.blog

  const showRemoveButton = { display: blog.user ? '' : 'none' }

  const addLike = async () => {
    try {
      await props.like(blog.id, blog)
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

  const handleLike = async event => {
    event.preventDefault()
    await addLike(blog.id, blog)
  }

  const handleRemove = async event => {
    event.preventDefault()
    await removeBlog(blog)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <h3>{blog.title}</h3>
      <div>{blog.url}</div>
      <div >{blog.likes} likes <Button variant="primary" onClick={handleLike}>Like</Button></div>
      {blog.user ? <div>added by {blog.user.name}</div> : null}
      <div style={showRemoveButton}> <Button variant="primary" onClick={handleRemove}>Remove</Button></div>
      <h4>comments</h4>
      <Comment blogId={blog.id}/>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    comments: state.comments
  }
}

const mapDispatchToProps = {
  like, notificationNew, remove
}

const ConnectedBlog = connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)

export default ConnectedBlog

