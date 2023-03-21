import { useMutation } from 'react-query'
import { Exercise } from '../../models/Exercise'

export type CreateExerciseData = Omit<Exercise, 'id' | 'createdAt'>

async function createExercise(exerciseData: CreateExerciseData) {
  const res = await fetch('/api/exercise', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(exerciseData),
  })

  if (!res.ok) {
    throw new Error('Server error')
  }
}

export const useCreateExercise = () => {
  return useMutation(createExercise, {
    mutationKey: ['createExercise'],
  })
}
