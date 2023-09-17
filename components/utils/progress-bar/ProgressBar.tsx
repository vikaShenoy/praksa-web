import { useMemo, useRef } from 'react'
import styled from 'styled-components'

const PROGRESS_BAR_HEIGHT = '1.5rem'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: ${PROGRESS_BAR_HEIGHT};
  margin: ${(props) => props.theme.spacing.lg} 0;
`

const OuterBar = styled.div`
  height: ${PROGRESS_BAR_HEIGHT};
  width: 100%;
  background-color: ${(props) => props.theme.colors.faded};
  border-radius: 1.5rem;
`

const InnerBar = styled.div<{ width: number; fullBar: boolean }>`
  height: ${PROGRESS_BAR_HEIGHT};
  width: ${(props) => (props.fullBar ? '100%' : `${props.width}%`)};
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: 1.5rem;

  transition: width 0.2s;
`

interface Props {
  currentVal: number
  maxVal: number
}

const ProgressBar = ({ currentVal, maxVal }: Props) => {
  const outerBar = useRef<HTMLDivElement>(null)

  const innerBarWidthPercentage: number = useMemo(() => {
    const outer = outerBar.current
    if (!outer || !currentVal || !maxVal) {
      return 0
    }
    return (currentVal / maxVal) * 100
  }, [currentVal, maxVal, outerBar])

  return (
    <Wrapper>
      <OuterBar ref={outerBar}>
        <InnerBar
          width={innerBarWidthPercentage}
          fullBar={currentVal === maxVal && currentVal !== 0}
          role="progressbar"
        />
      </OuterBar>
    </Wrapper>
  )
}

export default ProgressBar
