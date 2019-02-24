import React, { useState } from 'react'

const Blog = ({ blog , addLike }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = async event => {
    event.preventDefault()
    blog.likes = blog.likes + 1
    await addLike(blog)
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
      <div onClick={toggleVisibility}>
        {blog.title} {blog.author}
      </div>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>{blog.likes} likes <button onClick={handleLike}>Like</button></div>
        {blog.user ? <div>added by {blog.user.name}</div> : null}
      </div>  
    </div>
  )
}

export default Blog
