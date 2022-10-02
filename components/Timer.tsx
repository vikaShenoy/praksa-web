import { useEffect, useMemo, useRef, useState } from 'react';
import { MdOutlineRestartAlt } from 'react-icons/md';
import styled from 'styled-components';
import { DEFAULT_COUNTDOWN_TIME } from '../utils/constants';
import IconButton, { ButtonSize } from './buttons/IconButton';
import PlayStopButton from './buttons/PlayStopButton';
import { Card } from './utils/Card';
import { CenteredFlexRow } from './utils/Containers';
import ProgressBar from './utils/ProgressBar';
import { BoldText } from './utils/Text';
import TimeInput from './utils/TimeInput';

const TimerCard = styled(Card)`
  min-width: 400px;
`;

// TODO: Test
const Timer = () => {
  const [totalSeconds, setTotalSeconds] = useState(DEFAULT_COUNTDOWN_TIME);
  const [secondsRemaining, setSecondsRemaining] = useState(totalSeconds);
  const [isEditingTime, setIsEditingTime] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
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

  const onEditTime = () => {
    stopTimer();
    setIsEditingTime(true);
    setSecondsRemaining(0);
  };

  const onTimeEntered = (seconds: number) => {
    setIsEditingTime(false);
    setTotalSeconds(seconds);
    setSecondsRemaining(seconds);
    stopTimer();
  };

  const timeLabel: string = useMemo(() => {
    const minutes = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;

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
      {isEditingTime ? (
        <TimeInput onEnter={onTimeEntered} />
      ) : (
        <BoldText onClick={onEditTime} aria-label="tempo-label">
          {timeLabel}
        </BoldText>
      )}
      <ProgressBar currentVal={secondsRemaining} maxVal={totalSeconds} />
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
