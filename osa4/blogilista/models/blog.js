const mongoose = require('mongoose')
const logger = require('../utils/logger')
const config = require('../utils/config')

logger.info('connecting to', config.MONGODB_URI)

const mongoUrl = process.env.MONGODB_URI //'mongodb://localhost/bloglist'
mongoose.connect(mongoUrl, { useNewUrlParser: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: { type: Number, default: 0 }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)