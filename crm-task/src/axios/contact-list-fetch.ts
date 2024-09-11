import axios from 'axios'

export const contactListFetch = axios.create({
  // usually comes from environment
  baseURL: 'http://localhost:3000/contact_list'
})

// here some common settings for an axios custom fetch

// contactListFetch.interceptors.request.use((config) => {
//   // config.headers['Authorization'] = `Bearer ${token}`
//   // config.timeout = 5000
//   return config
// })
