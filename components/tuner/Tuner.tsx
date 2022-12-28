import styled from 'styled-components'
import { Card } from '../../styles/wrappers/components'
import { BoldText } from '../../styles/wrappers/fonts'

const TunerCard = styled(Card)``

const Tuner = () => {
  return (
    <TunerCard gridArea="tuner">
      <BoldText>Tuner (coming soon)</BoldText>
    </TunerCard>
  )
}

export default Tuner
