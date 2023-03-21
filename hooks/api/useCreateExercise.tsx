import { useMutation } from 'react-query'
import { Exercise } from '../../models/Exercise'

export type CreateExerciseData = Omit<Exercise, 'id' | 'createdAt'>

async function createExercise(exerciseData: CreateExerciseData) {
  await fetch('/api/exercise', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(exerciseData),
  })
}

export const useCreateExercise = () => {
  return useMutation(createExercise, { mutationKey: ['createExercise'] })
}
