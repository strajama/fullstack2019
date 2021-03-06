import React from 'react'
import  { useField } from '../hooks'

const CreateNew = ({ createNew }) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

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

export default CreateNew