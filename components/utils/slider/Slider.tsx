import { ChangeEvent } from 'react'
import styled from 'styled-components'

export const SLIDER_HEIGHT = '0.75rem'

const SliderInput = styled.input`
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: ${SLIDER_HEIGHT};
  background-color: ${(props) => props.theme.colors.faded};
  border-radius: 1.5rem;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 2rem;
    width: 2rem;
    border-radius: 50%;
    background-color: ${(props) => props.theme.colors.secondary};
    cursor: pointer;
  }
`

interface Props {
  minVal: number
  maxVal: number
  currentVal: number
  onValueChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Slider = ({ minVal, maxVal, currentVal, onValueChange }: Props) => {
  return (
    <>
      <SliderInput
        type="range"
        min={minVal}
        max={maxVal}
        value={currentVal}
        onChange={onValueChange}
      />
    </>
  )
}

export default Slider
