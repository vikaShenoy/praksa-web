import { useQuery } from 'react-query'
import { Exercise } from '../../../models/Exercise'

async function getExercises() {
  const response = await fetch('/api/exercises', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  const json = await response.json()
  const exercises: Exercise[] = json.data
  return exercises
}

export const useGetExercises = () => {
  return useQuery(['exercises'], getExercises)
}
