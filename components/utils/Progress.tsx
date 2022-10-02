import { useMemo, useRef } from 'react';
import styled from 'styled-components';
import { styles } from '../../styles/styles';

const OuterBar = styled.div`
  height: 16px;
  width: 300px;
  background-color: ${(props) => props.theme.colors.disabled};
  border-radius: ${styles.borderRadius.md};

  margin: 48px 0;
`;

const InnerBar = styled.div<{ width: number }>`
  height: 16px;
  width: ${(props) => props.width}px;
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: ${styles.borderRadius.md};
`;

interface Props {
  currentVal: number;
  maxVal: number;
}

// TODO: test
const Progress = ({ currentVal, maxVal }: Props) => {
  const outerBar = useRef<HTMLDivElement>(null);

  const innerBarWidth: number = useMemo(() => {
    const outer = outerBar.current;
    if (!outer) {
      return 0;
    }
    return (currentVal / maxVal) * outer.offsetWidth;
  }, [currentVal, maxVal]);

  return (
    <OuterBar ref={outerBar}>
      <InnerBar width={innerBarWidth} />
    </OuterBar>
  );
};

export default Progress;
