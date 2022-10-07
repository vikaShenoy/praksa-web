import { useMemo, useRef } from 'react'
import styled from 'styled-components'
import { styles } from '../../styles/styles'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: ${styles.components.progressBarHeight};
  margin: ${styles.spacing.lg} 0;
`

const OuterBar = styled.div`
  height: ${styles.components.progressBarHeight};
  width: 100%;
  background-color: ${(props) => props.theme.colors.disabled};
  border-radius: ${styles.borderRadius.md};
`

const InnerBar = styled.div<{ width: number; fullBar: boolean }>`
  height: ${styles.components.progressBarHeight};
  width: ${(props) => (props.fullBar ? '100%' : `${props.width}%`)};
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: ${styles.borderRadius.md};

  transition: width 0.2s;
`

interface Props {
  currentVal: number
  maxVal: number
}

// TODO: test
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
