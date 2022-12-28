import { FormikHelpers } from 'formik'
import { createContext, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import { Exercise } from '../../models/Exercise'
import { Card } from '../../styles/wrappers/components'
import { BoldText } from '../../styles/wrappers/fonts'
import CreateEditExercise, {
  ExerciseForm,
} from './create-edit-exercise/CreateEditExercise'

import ViewExercises from './view-exercises/ViewExercises'

const ExercisesCard = styled(Card)`
  gap: ${(props) => props.theme.spacing.md};
  justify-content: flex-start;
`

interface ExerciseContextData {
  showCreateExercise: () => void
  onShowEdit: (exerciseId: string) => void
  onDelete: (exerciseId: string) => void
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

  const [exercises, setExercises] = useState<Exercise[]>([])

  const [isCreating, setIsCreating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [exerciseBeingEdited, setExerciseBeingEdited] =
    useState<Exercise | null>(null)

  // TODO: remove dev code and use a real API request to persist the new exercise
  const onCreate = (
    values: ExerciseForm,
    { setSubmitting }: FormikHelpers<ExerciseForm>
  ) => {
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

  const onShowEdit = (exerciseId: string) => {
    const exercise = exercises.find((exercise) => exercise.id === exerciseId)
    if (exercise) {
      setExerciseBeingEdited(exercise)
      setIsEditing(true)
    }
  }

  // TODO: remove dev code and a use a real API to edit the exercise
  const onEdit = (
    values: ExerciseForm,
    { setSubmitting }: FormikHelpers<ExerciseForm>
  ) => {
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

  // TODO: remove dev code and use real API to delete the exercise
  const onDelete = (exerciseId: string) => {
    const updatedExercises = exercises.filter(
      (exercise) => exercise.id !== exerciseId
    )
    setExercises(updatedExercises)
  }

  return (
    <ExercisesCard gridArea="exercises">
      <BoldText>{t('exercises.title')}</BoldText>

      <ExerciseContext.Provider
        value={{
          showCreateExercise: () => setIsCreating(true),
          onShowEdit,
          onDelete,
        }}
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
            exercise={exerciseBeingEdited ? exerciseBeingEdited : undefined}
          />
        )}

        {!isCreating && !isEditing && <ViewExercises exercises={exercises} />}
      </ExerciseContext.Provider>
    </ExercisesCard>
  )
}

export default Exercises
