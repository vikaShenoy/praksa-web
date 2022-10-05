import { ChangeEvent } from 'react';
import styled from 'styled-components';
import { styles } from '../../styles/styles';

const SliderInput = styled.input`
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: ${styles.components.sliderTrackHeight};
  background: ${(props) => props.theme.colors.disabled};
  border-radius: ${styles.borderRadius.md};

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: ${styles.components.sliderThumbSize};
    width: ${styles.components.sliderThumbSize};
    border-radius: 50%;
    background: ${(props) => props.theme.colors.secondary};
    cursor: pointer;
  }
`;

interface Props {
  minVal: number;
  maxVal: number;
  currentVal: number;
  onValueChange: (e: ChangeEvent<HTMLInputElement>) => void;
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
  );
};

export default Slider;
