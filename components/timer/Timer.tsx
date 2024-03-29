import { useAtom } from 'jotai'
import { FC, useEffect, useMemo, useRef, useState } from 'react'
import { MdOutlineRestartAlt } from 'react-icons/md'
import styled from 'styled-components'
import { timeAtom } from '../../contexts/jotai'
import { Card } from '../../styles/wrappers/components'
import { BoldText } from '../../styles/wrappers/fonts'
import IconButton, {
  ButtonSize,
} from '../buttons/circle-icon-button/CircleIconButton'
import PlayStopButton from '../buttons/play-stop-btn/PlayStopButton'
import ProgressBar from '../utils/progress-bar/ProgressBar'
import TimeInput from '../utils/time-input/TimeInput'

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${(props) => props.theme.spacing.md};
`

const Timer: FC = () => {
  const [totalSeconds, setTotalSeconds] = useAtom(timeAtom)
  const [secondsRemaining, setSecondsRemaining] = useState(totalSeconds)
  const [isEditingTime, setIsEditingTime] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const timerFunc = useRef<NodeJS.Timer | null>(null)

  useEffect(() => {
    setSecondsRemaining(totalSeconds)
  }, [totalSeconds])

  useEffect(() => {
    return () => {
      if (timerFunc.current) {
        clearInterval(timerFunc.current)
      }
    }
  }, [])

  function tickTimerDown() {
    setSecondsRemaining((prev: number) => {
      if (prev === 1) {
        stopTimer()
        return 0
      } else {
        return (prev -= 1)
      }
    })
  }

  function startTimer() {
    if (secondsRemaining === 0) {
      resetTimer()
    }

    setIsPlaying(true)
    timerFunc.current = setInterval(tickTimerDown, 1000)
  }

  function stopTimer() {
    setIsPlaying(false)
    if (timerFunc.current) {
      clearInterval(timerFunc.current)
    }
  }

  function resetTimer() {
    stopTimer()
    setSecondsRemaining(totalSeconds)
  }

  function onEditTime() {
    stopTimer()
    setIsEditingTime(true)
    setSecondsRemaining(0)
  }

  function onTimeEntered(seconds: number) {
    setIsEditingTime(false)
    setTotalSeconds(seconds)
    setSecondsRemaining(seconds)
    stopTimer()
  }

  const timeLabel: string = useMemo(() => {
    const minutes = Math.floor(secondsRemaining / 60)
    const seconds = secondsRemaining % 60

    if (minutes === 0) {
      return `${seconds}s`
    }

    if (minutes > 0 && seconds < 10) {
      return `${minutes}:0${seconds}`
    }

    return `${minutes}:${seconds}`
  }, [secondsRemaining])

  return (
    <Card gridArea="timer">
      {isEditingTime ? (
        <TimeInput onEnter={onTimeEntered} />
      ) : (
        <BoldText onClick={onEditTime} aria-label="time-label">
          {timeLabel}
        </BoldText>
      )}
      <ProgressBar currentVal={secondsRemaining} maxVal={totalSeconds} />
      <ButtonContainer>
        <PlayStopButton
          isPlaying={isPlaying}
          onClick={() => (isPlaying ? stopTimer() : startTimer())}
        />
        <IconButton
          iconName={MdOutlineRestartAlt}
          size={ButtonSize.LARGE}
          onClick={resetTimer}
          ariaLabel="reset-timer-button"
        />
      </ButtonContainer>
    </Card>
  )
}

export default Timer
