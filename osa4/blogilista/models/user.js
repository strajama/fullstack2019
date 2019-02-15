const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const logger = require('../utils/logger')
const config = require('../utils/config')

logger.info('connecting to', config.MONGODB_URI)

const mongoUrl = process.env.MONGODB_URI //'mongodb://localhost/bloglist'
mongoose.Promise = global.Promise
mongoose.connect(mongoUrl, { useNewUrlParser: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

const userSchema = mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    unique: true,
    required: true
  },
  name: String,
  passwordHash: {
    type: String
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

userSchema.plugin(uniqueValidator, { message: 'username must be unique' })

module.exports = mongoose.model('User', userSchema)