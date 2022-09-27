import { ChangeEvent, useState } from 'react';
import { IoMdPlay } from 'react-icons/io';
import styled from 'styled-components';
import { styles } from '../styles/styles';
import { INITIAL_BPM, MAX_BPM, MIN_BPM } from '../utils/constants';
import { Card } from './utils/Card';
import IconButton, { ButtonSize } from './utils/IconButton';
import Slider from './utils/Slider';
import { BoldText } from './utils/Text';

const MetronomeCard = styled(Card)`
  margin: ${styles.spacing.sm2};
  max-width: 500px;
`;

const SliderWrapper = styled.div`
  margin: ${styles.spacing.lg} 0;
  width: 100%;
`;

const PlusIcon = styled(IoMdPlay)`
  color: ${(props) => props.theme.colors.icon};
  font-size: 24px;
  margin-left: 2px;
`;

const Metronome = () => {
  const [bpm, setBpm] = useState(INITIAL_BPM);

  const onSliderUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    setBpm(Number(e.target.value));
  };

  return (
    <div>
      <MetronomeCard>
        <BoldText>{bpm.toString()}</BoldText>
        <SliderWrapper>
          <Slider
            minVal={MIN_BPM}
            maxVal={MAX_BPM}
            currentVal={bpm}
            onValueChange={onSliderUpdate}
          />
        </SliderWrapper>
        <IconButton size={ButtonSize.LARGE} Icon={<PlusIcon />} />
      </MetronomeCard>
    </div>
  );
};

export default Metronome;
