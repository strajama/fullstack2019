import React, { useState } from 'react'

const Blog = ({ blog , addLike, removeBlog }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const showRemoveButton = { display: blog.user ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = async event => {
    event.preventDefault()
    blog.likes = blog.likes + 1
    await addLike(blog)
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
    <div style={blogStyle} className='blogView'>
      <div onClick={toggleVisibility} className='smallView'>
        {blog.title} {blog.author}
      </div>
      <div style={showWhenVisible} className='fullView'>
        <div>{blog.url}</div>
        <div>{blog.likes} likes <button onClick={handleLike}>Like</button></div>
        {blog.user ? <div>added by {blog.user.name}</div> : null}
        <div style={showRemoveButton}> <button onClick={handleRemove}>Remove</button></div>
      </div>
    </div>
  )
}

export default Blog
