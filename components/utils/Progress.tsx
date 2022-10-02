import styled from 'styled-components';
import { styles } from '../../styles/styles';

const OuterBar = styled.div`
  height: 16px;
  width: 300px;
  background-color: ${(props) => props.theme.colors.disabled};
  border-radius: ${styles.borderRadius.md};

  margin: 48px 0;
`;

const InnerBar = styled.div<{width: number}>`
  height: 16px;
  width: ${(props) => props.width}px;
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: ${styles.borderRadius.md};
`;

interface Props {
  currentValue: number;
  maxValue: number;
}

// TODO: test
const Progress = ({ currentValue, maxValue }: Props) => {
  return (
    <OuterBar>
      <InnerBar width={(currentValue / maxValue) * 300}/>
    </OuterBar>
  );
};

export default Progress;
