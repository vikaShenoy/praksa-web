import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Exercise } from '../../../models/Exercise'
import { BodyText } from '../../../styles/wrappers/fonts'
import SecondaryBtn from '../../buttons/secondary-btn/SecondaryBtn'
import ExerciseCell from '../exercise-cell/ExerciseCell'

const MarginTopWrapper = styled.div`
  margin-top: auto;
`

interface ViewExercisesProps {
  exercises: Exercise[]
  onCreate: () => void
}

const ViewExercises: React.FC<ViewExercisesProps> = ({
  exercises,
  onCreate,
}) => {
  const { t } = useTranslation()
  return (
    <>
      {exercises.length > 0 ? (
        <>
          {exercises.map((exercise) => (
            <ExerciseCell
              key={exercise.id}
              exercise={exercise}
              onEdit={() => console.log('TODO: On edit')}
              onDelete={() => console.log('TODO: On delete')}
            />
          ))}
          <MarginTopWrapper>
            <SecondaryBtn text={t('common.add')} onClick={onCreate} />
          </MarginTopWrapper>
        </>
      ) : (
        <>
          <BodyText>{t('exercises.prompt')}</BodyText>
          <MarginTopWrapper>
            <SecondaryBtn text={t('common.add')} onClick={onCreate} />
          </MarginTopWrapper>
        </>
      )}
    </>
  )
}

export default ViewExercises
