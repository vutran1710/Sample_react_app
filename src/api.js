const ENV = process.env.NODE_ENV || 'development'

const api_endpoints = {
  development: {
    storage: 'dev/products',
    database: 'dev/products'
  },
  production: {
    storage: 'products',
    database: 'products'
  }
}

// const api = api_endpoints[ENV]
const api = api_endpoints.development

export default api
