import { ChangeEvent, useRef, useState } from 'react'
import styled from 'styled-components'
import useClickOutside from '../../hooks/useClickOutside'
import { CenteredFlexRow } from '../../styles/wrappers/Containers'
import { BoldText } from '../../styles/wrappers/Text'

const Container = styled(CenteredFlexRow)`
  background-color: ${(props) => props.theme.colors.secondary};
`

const Input = styled(BoldText)`
  background-color: ${(props) => props.theme.colors.secondary};
  border: none;
  max-width: 120px;
  text-align: center;

  &::-webkit-inner-spin-button,
  -webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`
interface Props {
  onEnter: (seconds: number) => void
}

// TODO: test
const TimeInput = ({ onEnter }: Props) => {
  const [seconds, setSeconds] = useState('00')
  const [minutes, setMinutes] = useState('00')
  const containerRef = useRef<HTMLDivElement | null>(null)

  const onCloseInput = () => {
    onEnter(Number(minutes) * 60 + Number(seconds))
  }
  useClickOutside({ ref: containerRef, onClick: onCloseInput })

  const validRange = (val: number) => {
    return Number(val) > 0 && Number(val) < 60
  }

  const firstEntry = (val: string) => {
    return val.length === 3 && val.at(0) === '0'
  }

  const onSecondsChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const seconds = e.target.value
    if (firstEntry(seconds)) {
      setSeconds(seconds.slice(1, 3))
    } else if (seconds.length === 2 && validRange(Number(seconds))) {
      setSeconds(seconds)
    } else if (seconds.length === 1) {
      setSeconds(`0${seconds}`)
    } else if (seconds.length === 0) {
      setSeconds('00')
    }
  }

  const onMinutesChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const minutes = e.target.value
    if (firstEntry(minutes)) {
      setMinutes(minutes.slice(1, 3))
    } else if (minutes.length === 2 && validRange(Number(minutes))) {
      setMinutes(minutes)
    } else if (minutes.length === 1) {
      setMinutes(`0${minutes}`)
    } else if (minutes.length === 0) {
      setMinutes('00')
    }
  }

  const onEnterKeySubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onCloseInput()
    }
  }

  return (
    <Container gap={8} ref={containerRef}>
      <Input
        as="input"
        type="number"
        value={minutes}
        onChange={onMinutesChanged}
        onKeyDown={onEnterKeySubmit}
      />
      <BoldText>:</BoldText>
      <Input
        as="input"
        type="number"
        value={seconds}
        onChange={onSecondsChanged}
        onKeyDown={onEnterKeySubmit}
      />
    </Container>
  )
}

export default TimeInput
