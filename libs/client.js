import { createClient } from 'microcms-js-sdk'

export const client = createClient({
  serviceDomain: 'kakuta-programming-blog',
  apiKey: process.env.API_KEY,
})
