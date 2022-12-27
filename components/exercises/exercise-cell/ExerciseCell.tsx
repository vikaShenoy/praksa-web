import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IoPencilSharp } from 'react-icons/io5'
import { MdDelete } from 'react-icons/md'
import styled from 'styled-components'
import { Exercise } from '../../../models/Exercise'
import { BodyText } from '../../../styles/wrappers/fonts'
import IconButton from '../../buttons/icon-button/IconButton'
import BasicModal from '../../utils/basic-modal/BasicModal'
import { useExerciseContext } from '../Exercises'

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 3rem;
`

const MainRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${(props) => props.theme.colors.disabled};
  width: 80%;
  height: 100%;
`

const ActionRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  background-color: ${(props) => props.theme.colors.tertiary};
  width: 20%;
  height: 80%;
`

interface ExerciseCellProps {
  exercise: Exercise
}

const ExerciseCell: React.FC<ExerciseCellProps> = ({ exercise }) => {
  const { t } = useTranslation()
  const { onShowEdit, onDelete } = useExerciseContext()
  const exerciseDetails = `${exercise.name}`
  const [isDeleting, setIsDeleting] = useState(false)

  const onConfirmDelete = () => {
    setIsDeleting(false)
    onDelete(exercise.id)
  }

  return (
    <>
      <BasicModal
        isOpen={isDeleting}
        title={t('exercises.delete_modal.title')}
        subtitle={t('exercises.delete_modal.subtitle', { name: exercise.name })}
        onCancel={() => setIsDeleting(false)}
        onConfirm={onConfirmDelete}
      />
      <Container>
        <MainRow>
          <BodyText>{exerciseDetails}</BodyText>
        </MainRow>
        <ActionRow>
          <IconButton
            iconName={IoPencilSharp}
            onClick={() => onShowEdit(exercise.id)}
          />
          <IconButton iconName={MdDelete} onClick={() => setIsDeleting(true)} />
        </ActionRow>
      </Container>
    </>
  )
}

export default ExerciseCell
