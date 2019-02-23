import React, { useState} from 'react'

const CreateNew = ({createNew}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
  
    const handleSubmit = async event => {
        event.preventDefault()
        const newBlog = await createNew({
                title, author, url
            })
        if (newBlog) {
            setTitle('')
            setAuthor('')
            setUrl('')
        }
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleSubmit}>
            <div>
                <label>title:</label>
                <input
                  type="text"
                  value={title}
                  onChange={event => setTitle(event.target.value)}/>
            </div>
            <div>
                <label>author:</label>
                <input
                  type="text"
                  value={author}
                  onChange={event => setAuthor(event.target.value)}/>
            </div>
            <div>
                <label>url:</label>
                <input
                  type="text"
                  value={url}
                  onChange={event => setUrl(event.target.value)}/>
            </div>
            <div>
                <button type="submit">create</button>
            </div>
            </form>
        </div>
    )


}

export default CreateNew