import axios from 'axios'

const api = axios.create({
  baseURL: 'https://jerod.pathway4.click',
})

export default api