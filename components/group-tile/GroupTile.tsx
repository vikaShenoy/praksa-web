import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import GroupContext from '../../contexts/GroupContext'
import { ExerciseGroup } from '../../models/ExerciseGroup'
import { BodyText } from '../../styles/wrappers'

interface Props {
  group: ExerciseGroup
  isSelected: boolean
}

const Container = styled.div<{ isSelected: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  padding: ${(props) => `${props.theme.spacing.sm} ${props.theme.spacing.md}`};
  background-color: ${(props) =>
    props.isSelected ? props.theme.colors.accent : props.theme.colors.disabled};

  box-shadow: ${(props) => props.theme.shadows.md};

  cursor: pointer;

  transition: background-color 0.3s ease-in-out;
`

const GroupTile = ({ group, isSelected }: Props) => {
  const { t } = useTranslation()
  const { selectedGroup, setSelectedGroup } = useContext(GroupContext)

  const onSelect = () => {
    selectedGroup === group.uuid
      ? setSelectedGroup(null)
      : setSelectedGroup(group.uuid)
  }

  return (
    <Container
      isSelected={isSelected}
      onClick={onSelect}
      aria-label="Exercise group tile"
    >
      <BodyText>{group.name}</BodyText>
      <BodyText>
        {t('groups.num_exercises', { count: group.exercises.length })}
      </BodyText>
    </Container>
  )
}

export default GroupTile
