import { createContext, useContext } from "react"

interface ExerciseContextData {
  showCreateExercise: () => void
  onShowEdit: (exerciseId: string) => void
  onDelete: (exerciseId: string) => void
}

export const ExerciseContext = createContext<ExerciseContextData | undefined>(
  undefined
)

export const useExerciseContext = () => {
  const exerciseContext = useContext(ExerciseContext)
  if (!exerciseContext) {
    throw new Error(
      'No ExerciseContext.Provider found when using ExerciseContext'
    )
  }
  return exerciseContext
}