import jwt from 'jsonwebtoken'
import Axios from 'axios'

import { BACKEND_URL } from '@/vars.js'

export const hasValidToken = () => {
  const token = getToken()
  if (!token) return false

  const decoded = jwt.decode(token)

  return Date.now() / 1000 <= decoded.exp
}

export const getToken = () => {
  return sessionStorage.getItem('token')
}

export const setToken = token => {
  return sessionStorage.setItem('token', token)
}

export const clearToken = () => {
  sessionStorage.clear()
}

export const getAxiosInstance = () => {
  return Axios.create({
    headers: {
      Authorization: 'Bearer ' + getToken()
    },
    baseURL: BACKEND_URL
  })
}
