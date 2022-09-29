import axios from 'axios'

export function request(config) {
  const richEditorInstance = axios.create({
    baseURL: 'http://localhost:8000'
  })

  return richEditorInstance(config)
}