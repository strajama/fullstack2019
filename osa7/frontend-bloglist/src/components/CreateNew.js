import React from 'react'
import { createBlog } from '../reducers/blogReducer'
import { notificationNew } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import  { useField } from '../hooks'

const CreateNew = (props) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const createNew = async blog => {
    try {
      props.createBlog(blog)
      props.notificationNew('blog added', 5)
    } catch (error) {
      props.notificationNew(error.message, 5)
    }
  }

  const handleSubmit = async event => {
    event.preventDefault()
    const newBlog = await createNew({
      title: title.value, author: author.value, url: url.value
    })
    if (newBlog) {
      title.reset()
      author.reset()
      url.reset()
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>title:</label>
          <input {...title.print()}
          />
        </div>
        <div>
          <label>author:</label>
          <input {...author.print()}
          />
        </div>
        <div>
          <label>url:</label>
          <input {...url.print()}
          />
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  )


}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  createBlog, notificationNew
}

const ConnectedCreateNew = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateNew)

export default ConnectedCreateNew