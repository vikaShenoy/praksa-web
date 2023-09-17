import { FormikHelpers } from 'formik'
import { use, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { ExerciseContext } from '../../contexts/ExerciseContext'
import { useCreateExercise } from '../../hooks/api/exercise/useCreateExercise'
import { useDeleteExercise } from '../../hooks/api/exercise/useDeleteExercise'
import { useGetExercises } from '../../hooks/api/exercise/useGetExercises'
import { useUpdateExercise } from '../../hooks/api/exercise/useUpdateExercise'
import { Exercise } from '../../models/Exercise'
import { Card } from '../../styles/wrappers/components'
import { BoldText } from '../../styles/wrappers/fonts'
import { ExerciseLoadingError } from '../exercise-loading-error/ExerciseLoadingError'
import CreateEditExercise, {
  ExerciseForm,
} from './create-edit-exercise/CreateEditExercise'
import ViewExercises from './view-exercises/ViewExercises'
import { useQueryClient } from 'react-query'

const CardContainer = styled(Card)`
  gap: ${(props) => props.theme.spacing.md};
  justify-content: flex-start;
`

export const ExerciseCard = () => {
  const { t } = useTranslation()
  const [isCreating, setIsCreating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [exerciseBeingEdited, setExerciseBeingEdited] =
    useState<Exercise | null>(null)

  const queryClient = useQueryClient()
  const {
    data: exerciseData,
    isError: errorLoadingExercise,
    isSuccess: successLoadingExercise,
  } = useGetExercises()
  const { mutate: createExercise } = useCreateExercise()
  const { mutate: updateExercise } = useUpdateExercise()
  const { mutate: deleteExercise } = useDeleteExercise()

  function onCreate(
    values: ExerciseForm,
    { setSubmitting }: FormikHelpers<ExerciseForm>
  ) {
    setSubmitting(true)
    createExercise(
      { ...values },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('exercises')
        },
        onError: () => {
          toast.error(t('errors.exercise.create'))
        },
        onSettled: () => {
          setSubmitting(false)
          setIsCreating(false)
        },
      }
    )
  }

  function cleanEditExerciseData(values: ExerciseForm) {
    if (values.targetBpm?.toString().length === 0) {
      values.targetBpm = undefined
    }
    if (values.currentBpm?.toString().length === 0) {
      values.currentBpm = undefined
    }
    if (values.durationSeconds?.toString().length === 0) {
      values.durationSeconds = undefined
    }
    return values
  }

  function onEdit(
    values: ExerciseForm,
    { setSubmitting }: FormikHelpers<ExerciseForm>
  ) {
    if (!exerciseBeingEdited) {
      return
    }

    const cleanedValues = cleanEditExerciseData(values)

    setSubmitting(true)
    updateExercise(
      { exerciseId: exerciseBeingEdited.id, data: { ...cleanedValues } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('exercises')
        },
        onError: () => {
          toast.error(t('errors.exercise.update'))
        },
        onSettled: () => {
          setSubmitting(false)
          setIsEditing(false)
        },
      }
    )
  }

  function onDelete(exerciseId: string) {
    deleteExercise(
      { exerciseId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('exercises')
        },
        onError: () => {
          toast.error(t('errors.exercise.delete'))
        },
      }
    )
  }

  function onShowEdit(exerciseId: string) {
    const exercise = exerciseData?.find(
      (exercise) => exercise.id === exerciseId
    )
    if (exercise) {
      setExerciseBeingEdited(exercise)
      setIsEditing(true)
    }
  }

  return (
    <CardContainer gridArea="exercises">
      <BoldText>{t('exercises.title')}</BoldText>
      {errorLoadingExercise && <ExerciseLoadingError />}
      {successLoadingExercise && (
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

          {!isCreating && !isEditing && (
            <ViewExercises exercises={exerciseData ?? []} />
          )}
        </ExerciseContext.Provider>
      )}
    </CardContainer>
  )
}
