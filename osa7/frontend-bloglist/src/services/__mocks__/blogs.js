const blogs = [
  {
    _id: '5c732591998b4e6d65b478f9',
    likes: 12,
    title: 'testikappale',
    author: 'tähän',
    url: 'tulee niin hyvä',
    user: '5c674dcba351fc4329423e03'
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

export default { getAll, setToken }