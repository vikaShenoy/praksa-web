import { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled, { useTheme } from 'styled-components'
import GroupContext from '../../contexts/GroupContext'
import useMediaQuery from '../../hooks/useMediaQuery'
import { ExerciseGroup } from '../../models/ExerciseGroup'
import { BodyText, Card, H2 } from '../../styles/wrappers'
import SecondaryBtn from '../buttons/secondary-btn/SecondaryBtn'
import GroupTile from '../group-tile/GroupTile'

const ViewGroupsCard = styled(Card)<{ isMobile: boolean }>`
  width: ${(props) => (props.isMobile ? '100%' : '25%')};
  min-width: ${(props) => props.theme.sizes.components.minCardWidth};
  gap: ${(props) => props.theme.spacing.md};
`

const Flex = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  width: 100%;
`

const BtnWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`

const ViewGroups = ({ groups }: { groups: ExerciseGroup[] }) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const [isEmpty] = useState(groups.length === 0)
  const { setShowCreateGroup, selectedGroup } = useContext(GroupContext)
  let isMobile = useMediaQuery(theme.sizes.breakpoints.sm)

  return (
    <ViewGroupsCard isMobile={isMobile}>
      <Flex>
        <H2>{t('groups.groups')}</H2>
      </Flex>
      {isEmpty ? (
        <BodyText>{t('groups.create_prompt')}</BodyText>
      ) : (
        <>
          {groups.map((group) => (
            <GroupTile
              key={group.uuid}
              group={group}
              isSelected={selectedGroup === group.uuid}
            />
          ))}
        </>
      )}
      <SecondaryBtn
        onClick={() => setShowCreateGroup(true)}
        text={t('common.create')}
      />
    </ViewGroupsCard>
  )
}

export default ViewGroups
