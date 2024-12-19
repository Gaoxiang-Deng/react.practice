import axios from "axios"

const BaseUrl = "https://server.gradspace.org/api/"

const onRequest = (config) => {
  const token = localStorage.getItem('token')
  config = {
    ...config, BaseUrl
  }
  if (!config.url?.includes("login")) {
    const newConfig = {
      ...config,
      headers: {
        ...config.headers,
        'token': token
      }
    }
    return newConfig
  }
  return config
}

const onRequestError = (error) => {
  console.log(error)
  return error
}

const onResponse = (response) => {
  return response
}

const onResponseError = (error) => {
  console.log(error)
  return error
}

const setupInterceptorsTo = (axiosInstance) => {
  axiosInstance.interceptors.request.use(onRequest, onRequestError)
  axiosInstance.interceptors.response.use(onResponse, onResponseError)
  return axiosInstance
}

const axiosInstance = setupInterceptorsTo(axios.create())

export const apiGet = async path => axiosInstance.get(`${BaseUrl}${path}`)
export const apiPost = async (path, data) => axiosInstance.post(`${BaseUrl}${path}`, data)
export const apiPut = async (path, data) => axiosInstance.post(`${BaseUrl}${path}`, data)
export const apiDelete = async path => axiosInstance.delete(`${BaseUrl}${path}`)

export const auth = () => {
  if (localStorage.getItem('token')) {
    return true
  } else {
    return false
  }
}