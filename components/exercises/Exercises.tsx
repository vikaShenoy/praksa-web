import { FormikHelpers } from 'formik'
import { createContext, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled, { useTheme } from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import useMediaQuery from '../../hooks/useMediaQuery'
import { Exercise } from '../../models/Exercise'
import { Card } from '../../styles/wrappers/components'
import { BoldText } from '../../styles/wrappers/fonts'
import CreateEditExercise, {
  ExerciseForm
} from './create-edit-exercise/CreateEditExercise'

import ViewExercises from './view-exercises/ViewExercises'

const ExercisesCard = styled(Card)`
  gap: ${(props) => props.theme.spacing.lg};
  justify-content: flex-start;
`

interface ExerciseContextData {
  showCreateExercise: () => void
  onShowEdit: (id: string) => void
}

const ExerciseContext = createContext<ExerciseContextData | undefined>(
  undefined
)

export const useExerciseContext = () => {
  const exerciseContext = useContext(ExerciseContext)
  if (!exerciseContext) {
    throw new Error(
      'No ExerciseContenxt.Provider found when using ExerciseContext'
    )
  }
  return exerciseContext
}

const Exercises = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  let isMobile = useMediaQuery(theme.sizes.breakpoints.sm)
  const [exercises, setExercises] = useState<Exercise[]>([])

  const [isCreating, setIsCreating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [exerciseBeingEdited, setExerciseBeingEdited] =
    useState<Exercise | null>(null)

  // TODO: remove dev code and use a real API request to persist the new exercise
  function onCreate(
    values: ExerciseForm,
    { setSubmitting }: FormikHelpers<ExerciseForm>
  ) {
    setSubmitting(true)
    const exercise: Exercise = {
      id: uuidv4(),
      createdAt: new Date(),
      ...values,
    }
    setExercises([exercise])
    setSubmitting(false)
    setIsCreating(false)
  }

  function onShowEdit(id: string) {
    const exercise = exercises.find((exercise) => exercise.id === id)
    if (exercise) {
      setExerciseBeingEdited(exercise)
      setIsEditing(true)
    }
  }

  // TODO: remove dev code and a use a real API to edit the exercise
  function onEdit(
    values: ExerciseForm,
    { setSubmitting }: FormikHelpers<ExerciseForm>
  ) {
    if (!exerciseBeingEdited) {
      return
    }

    setSubmitting(true)
    const newExerciseData: Exercise = {
      id: exerciseBeingEdited.id,
      createdAt: exerciseBeingEdited.createdAt,
      ...values,
    }
    const index = exercises.indexOf(exerciseBeingEdited)
    exercises[index] = newExerciseData
    setSubmitting(false)
    setIsEditing(false)
  }

  return (
    <ExercisesCard isMobile={isMobile}>
      <BoldText>{t('exercises.title')}</BoldText>

      <ExerciseContext.Provider
        value={{ showCreateExercise: () => setIsCreating(true), onShowEdit }}
      >
        {isCreating && (
          <CreateEditExercise
            onSubmit={onCreate}
            onCancel={() => setIsCreating(false)}
          />
        )}

        {isEditing && (
          <CreateEditExercise
            onSubmit={onEdit}
            onCancel={() => setIsEditing(false)}
            exercise={exerciseBeingEdited}
          />
        )}

        {!isCreating && !isEditing && <ViewExercises exercises={exercises} />}
      </ExerciseContext.Provider>
    </ExercisesCard>
  )
}

export default Exercises
