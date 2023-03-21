import { FormikHelpers } from 'formik'
import { createContext, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import styled from 'styled-components'
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

type CreateExerciseData = Omit<Exercise, 'id'>

type UpdateExerciseData = Partial<Exercise>

export const useExerciseContext = () => {
  const exerciseContext = useContext(ExerciseContext)
  if (!exerciseContext) {
    throw new Error(
      'No ExerciseContext.Provider found when using ExerciseContext'
    )
  }
  return exerciseContext
}

// TODO: Test
const Exercises = () => {
  const { t } = useTranslation()
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [exerciseBeingEdited, setExerciseBeingEdited] =
    useState<Exercise | null>(null)

  // TODO: Extract to hook
  useQuery(['exercises'], getExercises)

  async function createExercise(exerciseData: CreateExerciseData) {
    await fetch('/api/exercise', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(exerciseData),
    })
  }

  async function getExercises() {
    const response = await fetch('/api/exercises', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    const json = await response.json()
    const exercises: Exercise[] = json.data
    setExercises(exercises)
  }

  async function updateExercise(
    exerciseId: string,
    updateExerciseData: UpdateExerciseData
  ) {
    await fetch(`/api/exercise/${exerciseId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateExerciseData),
    })
  }

  async function deleteExercise(exerciseId: string) {
    await fetch(`/api/exercise/${exerciseId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  async function onCreate(
    values: ExerciseForm,
    { setSubmitting }: FormikHelpers<ExerciseForm>
  ) {
    setSubmitting(true)
    const createExerciseData: CreateExerciseData = {
      createdAt: new Date(),
      ...values,
    }

    try {
      await createExercise(createExerciseData)
    } catch (error) {
      // TODO: Error handling
      console.error(error)
    }

    setSubmitting(false)
    setIsCreating(false)
  }

  async function onEdit(
    values: ExerciseForm,
    { setSubmitting }: FormikHelpers<ExerciseForm>
  ) {
    if (!exerciseBeingEdited) {
      return
    }

    setSubmitting(true)

    try {
      await updateExercise(exerciseBeingEdited.id, { ...values })
    } catch (error) {
      // TODO: Error handling
      console.error(error)
    }

    setSubmitting(false)
    setIsEditing(false)
  }

  async function onDelete(exerciseId: string) {
    try {
      await deleteExercise(exerciseId)
    } catch (error) {
      // TODO: Error handling
      console.error(error)
    }
  }

  function onShowEdit(exerciseId: string) {
    const exercise = exercises.find((exercise) => exercise.id === exerciseId)
    if (exercise) {
      setExerciseBeingEdited(exercise)
      setIsEditing(true)
    }
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
