import { rest } from 'msw'

export const handlers = [
  rest.get('/api/exercises', (req, res, ctx) => {
    return res()
  }),

  rest.patch('/api/exercise/:id', (req, res, ctx) => {
    return res()
  }),

  rest.post('/api/exercise/:id', (req, res, ctx) => {
    return res()
  }),

  rest.delete('/api/exercise/:id', (req, res, ctx) => {
    return res()
  }),

  rest.get('/api/notes', (req, res, ctx) => {
    return res()
  }),

  rest.patch('/api/notes', (req, res, ctx) => {
    return res()
  }),
]
