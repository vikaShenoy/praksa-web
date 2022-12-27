import { ChangeEvent } from 'react'
import styled from 'styled-components'

const SliderInput = styled.input`
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: ${(props) => props.theme.sizes.components.sliderHeight};
  background: ${(props) => props.theme.colors.disabled};
  border-radius: ${(props) => props.theme.sizes.borderRadius};

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: ${(props) => props.theme.sizes.components.sliderThumbSize};
    width: ${(props) => props.theme.sizes.components.sliderThumbSize};
    border-radius: 50%;
    background: ${(props) => props.theme.colors.secondary};
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
