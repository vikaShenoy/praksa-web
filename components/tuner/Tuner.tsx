import styled, { useTheme } from 'styled-components'
import useMediaQuery from '../../hooks/useMediaQuery'
import { Card } from '../../styles/wrappers/components'
import { BoldText } from '../../styles/wrappers/fonts'

const TunerCard = styled(Card)``

const Tuner = () => {
  const theme = useTheme()
  let isMobile = useMediaQuery(theme.sizes.breakpoints.sm)

  return (
    <TunerCard isMobile={isMobile}>
      <BoldText>Tuner (coming soon)</BoldText>
    </TunerCard>
  )
}

export default Tuner
