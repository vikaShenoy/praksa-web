import { ChangeEvent, useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import styled from 'styled-components';
import useMetronomeRunner from '../hooks/useMetronomeRunner';
import { styles } from '../styles/styles';
import { DEFAULT_BPM, MAX_BPM, MIN_BPM } from '../utils/constants';
import IconButton, { ButtonSize } from './buttons/IconButton';
import PlayStopButton from './buttons/PlayStopButton';
import { Card } from './utils/Card';
import { CenteredFlexRow } from './utils/Containers';
import Slider from './utils/Slider';
import { BoldText } from './utils/Text';

const MetronomeCard = styled(Card)`
  min-width: 400px;
`;

const SliderWrapper = styled.div`
  height: ${styles.components.progressBarHeight};
  display: flex;
  align-items: center;
  width: 100%;
  margin: ${styles.spacing.lg} 0;
`;

const Margin = styled.div`
  width: 100%;
  margin: 0 ${styles.spacing.sm};
`;

const Metronome = () => {
  const [bpm, setBpm] = useState(DEFAULT_BPM);
  const [isPlaying, setIsPlaying] = useState(false);
  useMetronomeRunner({ bpm, isPlaying });

  const onSliderUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    setBpm(Number(e.target.value));
  };

  return (
    <div>
      <MetronomeCard>
        <BoldText aria-label="tempo-label">{bpm.toString()}</BoldText>
        <SliderWrapper>
          <IconButton
            iconName={AiOutlineMinus}
            onClick={() => {
              setBpm((prev) => prev - 1);
            }}
            size={ButtonSize.SMALL}
            ariaLabel="minus"
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
            iconName={AiOutlinePlus}
            onClick={() => {
              setBpm((prev) => prev + 1);
            }}
            size={ButtonSize.SMALL}
            ariaLabel="plus"
          />
        </SliderWrapper>
        <CenteredFlexRow gap={24}>
          <PlayStopButton
            onClick={() => setIsPlaying((prev) => !prev)}
            isPlaying={isPlaying}
          />
        </CenteredFlexRow>
      </MetronomeCard>
    </div>
  );
};

export default Metronome;
