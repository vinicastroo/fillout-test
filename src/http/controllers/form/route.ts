import { FastifyInstance } from 'fastify'
import { search } from './search'

export async function formRoutes(app: FastifyInstance) {
  app.get('/', (_, reply) => {
    return reply.status(200).send({ ok: 'ok' })
  })
  app.get('/form', search)
}
