import { FormikHelpers } from 'formik'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled, { useTheme } from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import useMediaQuery from '../../hooks/useMediaQuery'
import { Exercise } from '../../models/Exercise'
import { Card } from '../../styles/wrappers/components'
import { BoldText } from '../../styles/wrappers/fonts'
import CreateExercise, { ExerciseForm } from './create-exercise/CreateExercise'
import ViewExercises from './view-exercises/ViewExercises'

const ExercisesCard = styled(Card)`
  gap: ${(props) => props.theme.spacing.lg};
  justify-content: flex-start;
`

const Exercises = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  let isMobile = useMediaQuery(theme.sizes.breakpoints.sm)
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [isEditing, setIsEditing] = useState(false)

  function onCreate(
    values: ExerciseForm,
    { setSubmitting }: FormikHelpers<ExerciseForm>
  ) {
    setSubmitting(true)
    // TODO - remove dev code and use a real API request to persist the new exercise
    const exercise: Exercise = {
      id: uuidv4(),
      createdAt: new Date(),
      ...values,
    }
    setExercises([exercise])
    setSubmitting(false)
    setIsEditing(false)
  }

  return (
    <ExercisesCard isMobile={isMobile}>
      <BoldText>{t('exercises.title')}</BoldText>

      {isEditing && (
        <CreateExercise
          onCreate={onCreate}
          onCancel={() => setIsEditing(false)}
        />
      )}

      {!isEditing && (
        <ViewExercises
          exercises={exercises}
          onCreate={() => setIsEditing(true)}
        />
      )}
    </ExercisesCard>
  )
}

export default Exercises
