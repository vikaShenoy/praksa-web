import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled, { useTheme } from 'styled-components'
import useMediaQuery from '../../hooks/useMediaQuery'
import { ExerciseGroup } from '../../models/ExerciseGroup'
import { BodyText, Card, H2 } from '../../styles/wrappers'
import SecondaryBtn from '../buttons/secondary-btn/SecondaryBtn'

const ViewGroupsCard = styled(Card)<{ isMobile: boolean }>`
  width: ${(props) => (props.isMobile ? '100%' : '25%')};
  min-width: ${(props) => props.theme.sizes.components.minCardWidth};
  gap: ${(props) => props.theme.spacing.md};
`

const ViewGroups = ({ groups }: { groups: ExerciseGroup[] }) => {
  const [isEmpty] = useState(groups.length === 0)
  const theme = useTheme()
  let isMobile = useMediaQuery(theme.sizes.breakpoints.sm)
  const { t } = useTranslation()

  const onAddClick = () => {
    // TODO
  }

  return (
    <ViewGroupsCard isMobile={isMobile}>
      <H2>{t('groups.groups')}</H2>
      <BodyText>{t('groups.create_prompt')}</BodyText>
      <SecondaryBtn onClick={onAddClick} text={t('common.add')} />
    </ViewGroupsCard>
  )
}

export default ViewGroups
