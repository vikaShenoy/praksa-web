import { useMutation } from 'react-query'

interface DeleteExerciseVars {
  exerciseId: string
}

async function deleteExercise({ exerciseId }: DeleteExerciseVars) {
  const res = await fetch(`/api/exercise/${exerciseId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) {
    throw new Error('Error deleting exercise')
  }
}

export const useDeleteExercise = () => {
  return useMutation(deleteExercise, { mutationKey: ['deleteExercise'] })
}
