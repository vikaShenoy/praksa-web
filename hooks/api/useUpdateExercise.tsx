import { useMutation } from 'react-query'
import { Exercise } from '../../models/Exercise'

export type UpdateExerciseData = Partial<Exercise>

interface UpdateExerciseVars {
  exerciseId: string
  data: UpdateExerciseData
}

async function updateExercise({ exerciseId, data }: UpdateExerciseVars) {
  await fetch(`/api/exercise/${exerciseId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

export const useUpdateExercise = () => {
  return useMutation(updateExercise, { mutationKey: ['updateExercise'] })
}