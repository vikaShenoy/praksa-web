import { useEffect, useMemo, useRef, useState } from 'react';
import { MdOutlineRestartAlt } from 'react-icons/md';
import styled from 'styled-components';
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
  const [totalSeconds] = useState(3);
  const [secondsRemaining, setSecondsRemaining] = useState(totalSeconds);

  const [isPlaying, setIsPlaying] = useState(false);
  // const [timerFunc, setTimerFunc] = useState<NodeJS.Timer | null>(null);
  const timerFunc = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    return () => {
      if (timerFunc.current) {
        clearInterval(timerFunc.current);
      }
    };
  }, []);

  const tickTimerDown = () => {
    setSecondsRemaining((prev: number) => {
      if (prev === 1) {
        stopTimer();
        return 0;
      } else {
        return (prev -= 1);
      }
    });
  };

  const startTimer = () => {
    if (secondsRemaining === 0) {
      resetTimer();
    }
    
    setIsPlaying(true);
    timerFunc.current = setInterval(tickTimerDown, 1000);
  };

  const stopTimer = () => {
    setIsPlaying(false);
    if (timerFunc.current) {
      clearInterval(timerFunc.current);
    }
  };

  const resetTimer = () => {
    stopTimer();
    setSecondsRemaining(totalSeconds);
  };

  const timeLabel: string = useMemo(() => {
    const minutes = Math.floor(secondsRemaining / 60);
    const seconds = (secondsRemaining % 60);

    if (minutes === 0) {
      return `${seconds}s`;
    } 

    if (minutes > 0 && seconds < 10) {
      return `${minutes}:0${seconds}`;
    }
    
    return `${minutes}:${seconds}`;
  }, [secondsRemaining]);

  return (
    <TimerCard>
      <BoldText aria-label="tempo-label">{timeLabel}</BoldText>
      <Progress currentVal={secondsRemaining} maxVal={totalSeconds} />
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
