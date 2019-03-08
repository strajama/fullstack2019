import React, { useEffect }  from 'react'
import { connect } from 'react-redux'
import { notificationNew } from '../reducers/notificationReducer'
import { getComments, postComment } from '../reducers/commentReducer'
import  { useField } from '../hooks'
import { Form, Button } from 'react-bootstrap'

const Comment = (props) => {
  const comment = useField('text')

  const callComments = async id => {
    try {
      await props.getComments(id)
    } catch (error) {
      props.notificationNew(error.message, 5)
    }
  }

  const pushComment = async (id, newObject) => {
    try {
      await props.postComment(id, newObject)
      await props.notificationNew(`you added new comment: ${newObject.comment}`, 5)
      callComments(id)
    } catch (error) {
      await props.notificationNew(error.message, 5)
    }
  }

  useEffect( () => {
    callComments(props.blogId)
  }, [])

  const handleSubmit = async event => {
    event.preventDefault()
    await pushComment(props.blogId, {
      comment: comment.value
    })
    comment.reset()
  }

  const ownComments = () => {
    return props.comments.filter(a => a.blog.id === props.blogId)
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <div>
          <Form.Label>new comment</Form.Label>
          <input {...comment.print()}
          />
          <Button variant="primary" type="submit">add</Button>
        </div>
      </Form>
      <ul>
        {ownComments().map(c =>
          <li key={c.id}>{c.comment}</li>
        )}
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    comments: state.comments
  }
}

const mapDispatchToProps = {
  getComments, notificationNew, postComment
}

const ConnectedComment = connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment)

export default ConnectedComment