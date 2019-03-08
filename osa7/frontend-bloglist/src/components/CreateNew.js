import React from 'react'
import { createBlog } from '../reducers/blogReducer'
import { notificationNew } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import  { useField } from '../hooks'
import { Form, Button } from 'react-bootstrap'

const CreateNew = (props) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const createNew = async blog => {
    try {
      await props.createBlog(blog)
      await props.notificationNew('blog added', 5)
    } catch (error) {
      await props.notificationNew(error.message, 5)
    }
  }

  const handleSubmit = async event => {
    event.preventDefault()
    await createNew({
      title: title.value, author: author.value, url: url.value, user: props.login.id
    })
    title.reset()
    author.reset()
    url.reset()
  }

  return (
    <div>
      <h2>create new</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <div>
            <Form.Label>title:</Form.Label>
            <input {...title.print()}
            />
          </div>
          <div>
            <Form.Label>author:</Form.Label>
            <input {...author.print()}
            />
          </div>
          <div>
            <Form.Label>url:</Form.Label>
            <input {...url.print()}
            />
          </div>
          <div>
            <Button variant="primary" type="submit">create</Button>
          </div>
        </Form.Group>

      </Form>
    </div>
  )


}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    login: state.login,
    users: state.users
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