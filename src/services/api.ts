import axios from 'axios'

const baseURL = 'https://api.fillout.com/v1/api'

const ApiClient = () => {
  const defaultOptions = {
    baseURL,
  }

  const instance = axios.create(defaultOptions)

  return instance
}

export default ApiClient()
