import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useExerciseContext } from '../../../contexts/ExerciseContext'
import { Exercise } from '../../../models/Exercise'
import { BodyText } from '../../../styles/wrappers/fonts'
import SecondaryBtn from '../../buttons/secondary-btn/SecondaryBtn'
import ExerciseCell from '../exercise-cell/ExerciseCell'

const MarginTopWrapper = styled.div`
  margin-top: auto;
`

interface ViewExercisesProps {
  exercises: Exercise[]
}

// TODO: Test
const ViewExercises: React.FC<ViewExercisesProps> = ({ exercises }) => {
  const { t } = useTranslation()
  const { showCreateExercise } = useExerciseContext()

  return (
    <>
      {exercises.length > 0 ? (
        <>
          {exercises.map((exercise) => (
            <ExerciseCell key={exercise.id} exercise={exercise} />
          ))}
          <MarginTopWrapper>
            <SecondaryBtn text={t('common.add')} onClick={showCreateExercise} />
          </MarginTopWrapper>
        </>
      ) : (
        <>
          <BodyText>{t('exercises.prompt')}</BodyText>
          <MarginTopWrapper>
            <SecondaryBtn text={t('common.add')} onClick={showCreateExercise} />
          </MarginTopWrapper>
        </>
      )}
    </>
  )
}

export default ViewExercises
