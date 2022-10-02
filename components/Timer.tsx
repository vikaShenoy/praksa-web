import { useCallback, useEffect, useMemo, useState } from 'react';
import { MdOutlineRestartAlt } from 'react-icons/md';
import styled from 'styled-components';
import { DEFAULT_COUNTDOWN_TIME } from '../utils/constants';
import IconButton, { ButtonSize } from './buttons/IconButton';
import PlayStopButton from './buttons/PlayStopButton';
import { Card } from './utils/Card';
import { CenteredFlexRow } from './utils/Containers';
import Progress from './utils/Progress';
import { BoldText } from './utils/Text';

const TimerCard = styled(Card)`
  min-width: 400px;
  height: 350px;
`;

// TODO: Test
const Timer = () => {
  const [totalSeconds] = useState(DEFAULT_COUNTDOWN_TIME);
  const [secondsRemaining, setSecondsRemaining] = useState(totalSeconds);

  const [isPlaying, setIsPlaying] = useState(false);
  const [timerFunc, setTimerFunc] = useState<NodeJS.Timer | null>(null);

  useEffect(() => {
    return () => {
      if (timerFunc) {
        clearInterval(timerFunc);
      }
    };
  }, []);

  const tickTimerDown = useCallback(() => {
    setSecondsRemaining((prev: number) => {
      if (prev === 1) {
        stopTimer();
        return 0;
      } else {
        return (prev -= 1);
      }
    });
  }, []);

  const startTimer = () => {
    setIsPlaying(true);
    const timerFunction = setInterval(tickTimerDown, 1000);
    setTimerFunc(timerFunction);
  };

  const stopTimer = () => {
    setIsPlaying(false);
    if (timerFunc) {
      clearInterval(timerFunc);
    }
  };

  const resetTimer = () => {
    stopTimer();
    setSecondsRemaining(totalSeconds);
  };

  const timeLabel: string = useMemo(() => {
    const minutes = Math.floor(secondsRemaining / 60);
    let seconds = (secondsRemaining % 60).toString();
    if (seconds === '0') {
      seconds = '00';
    }
    return `${minutes}:${seconds}`;
  }, [secondsRemaining]);

  return (
    <TimerCard>
      <BoldText aria-label="tempo-label">{timeLabel}</BoldText>
      <Progress currentValue={secondsRemaining} maxValue={totalSeconds} />
      <CenteredFlexRow gap={24}>
        <PlayStopButton
          isPlaying={isPlaying}
          onClick={() => (isPlaying ? stopTimer() : startTimer())}
        />
        <IconButton
          iconName={MdOutlineRestartAlt}
          size={ButtonSize.LARGE}
          onClick={resetTimer}
          ariaLabel="reset-timer"
        />
      </CenteredFlexRow>
    </TimerCard>
  );
};

export default Timer;
