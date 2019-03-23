import jwt from 'jsonwebtoken'

export const hasValidToken = () => {
  const token = getToken()
  if (!token) return false

  const decoded = jwt.decode(token)

  return Date.now() / 1000 <= decoded.exp
}

export const getToken = () => {
  return localStorage.getItem('token')
}

export const setToken = token => {
  return localStorage.setItem('token', token)
}
