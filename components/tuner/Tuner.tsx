import styled from 'styled-components'
import { Resolution, useResponsive } from '../../hooks/useResponsive'
import { Card } from '../../styles/wrappers/components'
import { BoldText } from '../../styles/wrappers/fonts'

const TunerCard = styled(Card)``

const Tuner = () => {
  const resolution = useResponsive()
  const isMobile = resolution === Resolution.Mobile
  return (
    <TunerCard gridArea="tuner">
      <BoldText>Tuner (coming soon)</BoldText>
    </TunerCard>
  )
}

export default Tuner
