import { useAtom } from 'jotai'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useExerciseContext } from '../../../contexts/ExerciseContext'
import { tempoAtom, timeAtom } from '../../../contexts/jotai'
import { Exercise } from '../../../models/Exercise'
import { BodyText } from '../../../styles/wrappers/fonts'
import SecondaryBtn from '../../buttons/secondary-btn/SecondaryBtn'
import ExerciseCell from '../exercise-cell/ExerciseCell'

const ScrollContainer = styled.div`
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  height: 300px;
`

const MarginTopWrapper = styled.div`
  margin-top: auto;
`

interface ViewExercisesProps {
  exercises: Exercise[]
}

const ViewExercises: React.FC<ViewExercisesProps> = ({ exercises }) => {
  const { t } = useTranslation()
  const { showCreateExercise } = useExerciseContext()
  const [_tempo, setTempo] = useAtom(tempoAtom)
  const [_time, setTime] = useAtom(timeAtom)
  const [selectedExerciseId, setSelectedExerciseId] = useState<string | null>(
    null
  )

  function onExerciseCellClick(id: string) {
    setSelectedExerciseId(id)
    const selectedExercise = exercises.find((exercise) => exercise.id === id)

    if (selectedExercise && selectedExercise.currentBpm) {
      setTempo(selectedExercise.currentBpm)
    }

    if (selectedExercise && selectedExercise.durationSeconds) {
      setTime(selectedExercise.durationSeconds)
    }
  }

  return (
    <>
      {exercises.length > 0 ? (
        <>
          <ScrollContainer>
            {exercises.map((exercise) => (
              <ExerciseCell
                key={exercise.id}
                exercise={exercise}
                onClick={onExerciseCellClick}
                isSelected={selectedExerciseId === exercise.id}
              />
            ))}
          </ScrollContainer>
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
