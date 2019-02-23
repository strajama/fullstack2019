
import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
  console.log('token määritelty', token)
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  console.log('ollaan createssa')
  const config = {
    headers: { Authorization: token },
  }
  console.log('konfigurointi tehty')
  console.log(baseUrl)
  console.log(newObject)
  console.log(config)
  const response = await axios.post(baseUrl, newObject, config)
  console.log('palautetaan create-data', config.headers)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${ baseUrl } /${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, create, update, setToken  }