import { FastifyInstance } from 'fastify'
import { search } from './search'

export async function formRoutes(app: FastifyInstance) {
  app.get('/', search)
}
