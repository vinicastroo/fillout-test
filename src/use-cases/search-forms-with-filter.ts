import { env } from '../env'
import api from '../services/api'

interface FilterClauseType {
  filterClauseType?: {
    value: string | number
    id: string
    condition: 'equals' | 'does_not_equal' | 'greater_than' | 'less_than'
  }[]
}

export interface Question {
  id: string
  name: string
  type: string
  value: string | number
}

export interface Response {
  submissionId: string
  submissionTime: string
  lastUpdatedAt: string
  questions: Question[]
}

export interface DataAPIFillout {
  responses: Response[]
  totalResponses: number
  pageCount: number
}

export class SearchFormsWithFilterUseCase {
  async getData() {
    const token = env.TOKEN
    const { data }: { data: DataAPIFillout } = await api.get(
      `forms/cLZojxk94ous/submissions`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return data
  }

  async execute({ filterClauseType }: FilterClauseType) {
    const forms = await this.getData()

    if (
      filterClauseType &&
      filterClauseType.length > 0 &&
      forms &&
      forms.responses.length > 0
    ) {
      const formattedForm = forms
      formattedForm.responses = formattedForm.responses.filter((form) => {
        const conditionQuestion = filterClauseType.every((filter) => {
          const conditionFilter = form.questions.some((question) => {
            if (
              filter.condition === 'equals' &&
              filter.id === question.id &&
              question.value
            ) {
              return question.value === filter.value
            } else if (
              filter.condition === 'does_not_equal' &&
              filter.id === question.id &&
              question.value
            ) {
              return question.value !== filter.value
            } else if (
              filter.condition === 'greater_than' &&
              filter.id === question.id &&
              question.value
            ) {
              return filter.value > question.value
            } else if (
              filter.condition === 'less_than' &&
              filter.id === question.id &&
              question.value
            ) {
              return filter.value < question.value
            }

            return false
          })

          return conditionFilter
        })

        return conditionQuestion
      })
      formattedForm.totalResponses = formattedForm.responses.length
      return formattedForm
    }
    return forms
  }
}
