import { useEffect, useMemo, useRef, useState } from 'react'
import { MdOutlineRestartAlt } from 'react-icons/md'
import { useTheme } from 'styled-components'
import useMediaQuery from '../../hooks/useMediaQuery'
import { Card } from '../../styles/wrappers/components'
import { CenteredFlexRow } from '../../styles/wrappers/containers'
import { BoldText } from '../../styles/wrappers/fonts'
import { DEFAULT_COUNTDOWN_TIME } from '../../utils/constants'
import IconButton, {
  ButtonSize,
} from '../buttons/circle-icon-button/CircleIconButton'
import PlayStopButton from '../buttons/play-stop-btn/PlayStopButton'
import ProgressBar from '../utils/progress-bar/ProgressBar'
import TimeInput from '../utils/time-input/TimeInput'

const Timer = ({
  initialTime = DEFAULT_COUNTDOWN_TIME,
}: {
  initialTime?: number
}) => {
  const theme = useTheme()
  let isMobile = useMediaQuery(theme.sizes.breakpoints.sm)
  const [totalSeconds, setTotalSeconds] = useState(initialTime)
  const [secondsRemaining, setSecondsRemaining] = useState(totalSeconds)
  const [isEditingTime, setIsEditingTime] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const timerFunc = useRef<NodeJS.Timer | null>(null)

  useEffect(() => {
    return () => {
      if (timerFunc.current) {
        clearInterval(timerFunc.current)
      }
    }
  }, [])

  const tickTimerDown = () => {
    setSecondsRemaining((prev: number) => {
      if (prev === 1) {
        stopTimer()
        return 0
      } else {
        return (prev -= 1)
      }
    })
  }

  const startTimer = () => {
    if (secondsRemaining === 0) {
      resetTimer()
    }

    setIsPlaying(true)
    timerFunc.current = setInterval(tickTimerDown, 1000)
  }

  const stopTimer = () => {
    setIsPlaying(false)
    if (timerFunc.current) {
      clearInterval(timerFunc.current)
    }
  }

  const resetTimer = () => {
    stopTimer()
    setSecondsRemaining(totalSeconds)
  }

  const onEditTime = () => {
    stopTimer()
    setIsEditingTime(true)
    setSecondsRemaining(0)
  }

  const onTimeEntered = (seconds: number) => {
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
    <Card isMobile={isMobile}>
      {isEditingTime ? (
        <TimeInput onEnter={onTimeEntered} />
      ) : (
        <BoldText onClick={onEditTime} aria-label="time-label">
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
          ariaLabel="reset-timer-button"
        />
      </CenteredFlexRow>
    </Card>
  )
}

export default Timer
