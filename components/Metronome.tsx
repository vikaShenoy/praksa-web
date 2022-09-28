import { ChangeEvent, useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { IoMdPlay } from 'react-icons/io';
import { IoStopSharp } from 'react-icons/io5';
import styled from 'styled-components';
import useMetronome from '../hooks/useMetronomeRunner';
import { styles } from '../styles/styles';
import {
  INITIAL_BPM,
  MAX_BPM,
  MIN_BPM
} from '../utils/constants';
import { Card } from './utils/Card';
import IconButton, { ButtonSize } from './utils/IconButton';
import Slider from './utils/Slider';
import { BoldText } from './utils/Text';

const MetronomeCard = styled(Card)`
  margin: ${styles.spacing.sm2};
  max-width: 500px;
  min-width: 300px;
`;

const SliderWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: ${styles.spacing.lg} 0;
`;

const PlayIcon = styled(IoMdPlay)`
  color: ${(props) => props.theme.colors.icon};
  font-size: 32px;
  margin-left: 2px;
`;

const StopIcon = styled(IoStopSharp)`
  color: ${(props) => props.theme.colors.icon};
  font-size: 32px;
`;

const PlusIcon = styled(AiOutlinePlus)`
  color: ${(props) => props.theme.colors.icon};
  font-size: 24px;
`;

const MinusIcon = styled(AiOutlineMinus)`
  color: ${(props) => props.theme.colors.icon};
  font-size: 24px;
`;

const Margin = styled.div`
  width: 100%;
  margin: 0 ${styles.spacing.sm};
`;

const Metronome = () => {
  const [bpm, setBpm] = useState(INITIAL_BPM);
  const [isPlaying, setIsPlaying] = useState(false);
  useMetronome({ bpm, isPlaying });

  const onSliderUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    setBpm(Number(e.target.value));
  };

  return (
    <div>
      <MetronomeCard>
        <BoldText>{bpm.toString()}</BoldText>
        <SliderWrapper>
          <IconButton
            onClick={() => {
              setBpm((prev) => prev - 1);
            }}
            size={ButtonSize.SMALL}
            Icon={<MinusIcon />}
          />
          <Margin>
            <Slider
              minVal={MIN_BPM}
              maxVal={MAX_BPM}
              currentVal={bpm}
              onValueChange={onSliderUpdate}
            />
          </Margin>
          <IconButton
            onClick={() => {
              setBpm((prev) => prev + 1);
            }}
            size={ButtonSize.SMALL}
            Icon={<PlusIcon />}
          />
        </SliderWrapper>
        <IconButton
          onClick={() => setIsPlaying((prev) => !prev)}
          size={ButtonSize.LARGE}
          Icon={isPlaying ? <StopIcon /> : <PlayIcon />}
        />
      </MetronomeCard>
    </div>
  );
};

export default Metronome;
