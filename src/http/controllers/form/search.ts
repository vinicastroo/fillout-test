import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { SearchFormsWithFilterUseCase } from '../../../use-cases/search-forms-with-filter'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchFormSchema = z.object({
    filterClauseType: z.string().optional(),
  })

  const params = searchFormSchema.parse(request.query)

  const filterClauseType = params.filterClauseType
    ? JSON.parse(params.filterClauseType)
    : undefined

  const searchFormsWithFilterUseCase = new SearchFormsWithFilterUseCase()
  const forms = await searchFormsWithFilterUseCase.execute({
    filterClauseType,
  })

  return reply.status(200).send(forms)
}
