let url = 'http://localhost:3000/v1'

if (process.env.NODE_ENV === 'production') {
  url = 'https://glo-ci.backend.g.kluster.app/v1'
}

// eslint-disable-next-line no-undef
if (typeof SERVER_URL !== 'undefined' && SERVER_URL) {
  // eslint-disable-next-line no-undef
  url = SERVER_URL
}

export const BACKEND_URL = url
