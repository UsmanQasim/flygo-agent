import axios from './index'

const login = async (data) => {
  try {
    const endpoint = '/agent/login'
    const response = await axios.post(endpoint,data)
    return response.data
  } catch (e) {
    console.log(e)
  }
}
const postFlight = async (data) => {
  try {
    const endpoint = '/sabre/flights'
    const response = await axios.post(endpoint,data)
    return response.data
  } catch (e) {
    console.log(e)
  }
}

export { login,postFlight }
