import { useAtom } from 'jotai'
import { ChangeEvent, useState } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import styled from 'styled-components'
import { tempoAtom } from '../../contexts/jotai'
import useMetronomeRunner from '../../hooks/useMetronomeRunner'
import { Card } from '../../styles/wrappers/components'
import { BoldText } from '../../styles/wrappers/fonts'
import { MAX_BPM, MIN_BPM } from '../../utils/constants'
import IconButton, {
  ButtonSize,
} from '../buttons/circle-icon-button/CircleIconButton'
import PlayStopButton from '../buttons/play-stop-btn/PlayStopButton'
import Slider, { SLIDER_HEIGHT } from '../utils/slider/Slider'

const SliderWrapper = styled.div`
  height: ${SLIDER_HEIGHT};
  display: flex;
  align-items: center;
  width: 100%;
  margin: ${(props) => props.theme.spacing.xl} 0;
`

const Margin = styled.div`
  width: 100%;
  margin: 0 ${(props) => props.theme.spacing.sm};
`

const Metronome = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [tempo, setTempo] = useAtom(tempoAtom)
  useMetronomeRunner({ tempo, isPlaying })

  function onSliderUpdate(e: ChangeEvent<HTMLInputElement>) {
    setTempo(Number(e.target.value))
  }

  return (
    <Card gridArea="metronome">
      <BoldText aria-label="tempo-label">{tempo.toString()}</BoldText>
      <SliderWrapper>
        <IconButton
          iconName={AiOutlineMinus}
          onClick={() => {
            setTempo((prev) => prev - 1)
          }}
          size={ButtonSize.SMALL}
          ariaLabel="minus"
        />
        <Margin>
          <Slider
            minVal={MIN_BPM}
            maxVal={MAX_BPM}
            currentVal={tempo}
            onValueChange={onSliderUpdate}
          />
        </Margin>
        <IconButton
          iconName={AiOutlinePlus}
          onClick={() => {
            setTempo((prev) => prev + 1)
          }}
          size={ButtonSize.SMALL}
          ariaLabel="plus"
        />
      </SliderWrapper>
      <PlayStopButton
        onClick={() => setIsPlaying((prev) => !prev)}
        isPlaying={isPlaying}
      />
    </Card>
  )
}

export default Metronome
