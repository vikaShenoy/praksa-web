import { FormikHelpers } from 'formik'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { ExerciseContext } from '../../contexts/ExerciseContext'
import { useCreateExercise } from '../../hooks/api/useCreateExercise'
import { useDeleteExercise } from '../../hooks/api/useDeleteExercise'
import { useLoadExercises } from '../../hooks/api/useLoadExercises'
import { useUpdateExercise } from '../../hooks/api/useUpdateExercise'
import { Exercise } from '../../models/Exercise'
import { Card } from '../../styles/wrappers/components'
import { BoldText } from '../../styles/wrappers/fonts'
import { ExerciseLoadingError } from '../exercise-loading-error/ExerciseLoadingError'
import CreateEditExercise, {
  ExerciseForm
} from './create-edit-exercise/CreateEditExercise'
import ViewExercises from './view-exercises/ViewExercises'

const CardContainer = styled(Card)`
  gap: ${(props) => props.theme.spacing.md};
  justify-content: flex-start;
`

// TODO: Test
export const ExerciseCard = () => {
  const { t } = useTranslation()
  const [isCreating, setIsCreating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [exerciseBeingEdited, setExerciseBeingEdited] =
    useState<Exercise | null>(null)

  const {
    data: exerciseData,
    refetch: refetchExercises,
    isError: errorLoadingExercise,
    isSuccess: successLoadingExercise,
  } = useLoadExercises()
  const { mutate: createExercise } = useCreateExercise()
  const { mutate: updateExercise } = useUpdateExercise()
  const { mutate: deleteExercise } = useDeleteExercise()

  async function testApi() {
    const res = await fetch("/api/test")
    if (res.ok) {
      console.log("success", res)
    } else {
      console.log("fail", res)
    }
  }

  useEffect(() => {
    testApi()
  }, [])

  function onCreate(
    values: ExerciseForm,
    { setSubmitting }: FormikHelpers<ExerciseForm>
  ) {
    setSubmitting(true)
    createExercise(
      { ...values },
      {
        onSuccess: () => {
          refetchExercises()
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

  function onEdit(
    values: ExerciseForm,
    { setSubmitting }: FormikHelpers<ExerciseForm>
  ) {
    if (!exerciseBeingEdited) {
      return
    }

    setSubmitting(true)
    updateExercise(
      { exerciseId: exerciseBeingEdited.id, data: { ...values } },
      {
        onSuccess: () => {
          refetchExercises()
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
          refetchExercises()
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
