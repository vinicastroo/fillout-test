import fastify from 'fastify'
import { formRoutes } from './http/controllers/form/route'

export const app = fastify()

app.register(formRoutes)

app.setErrorHandler((error, _, reply) => {
  console.error(error)
  return reply.status(500).send({ message: 'Internal server error.' })
})
