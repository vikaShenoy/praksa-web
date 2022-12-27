import { IoPencilSharp } from "react-icons/io5"
import { MdDelete } from "react-icons/md"
import styled from 'styled-components'
import { Exercise } from '../../../models/Exercise'
import { BodyText } from '../../../styles/wrappers/fonts'
import IconButton from "../../buttons/icon-button/IconButton"

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
  onEdit: () => void
  onConfirmDelete: () => void
}

const ExerciseCell: React.FC<ExerciseCellProps> = ({
  exercise,
  onEdit,
  onConfirmDelete,
}) => {
  const exerciseDetails = `${exercise.name}`

  const onDelete = () => {
    
  }

  return (
    <Container>
      <MainRow>
        <BodyText>{exerciseDetails}</BodyText>
      </MainRow>
      <ActionRow>
        <IconButton iconName={IoPencilSharp} onClick={onEdit} />
        <IconButton iconName={MdDelete} onClick={onDelete} />
      </ActionRow>
    </Container>
  )
}

export default ExerciseCell
