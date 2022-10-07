import styled from 'styled-components';
import { styles } from '../styles';

export const Flex = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: ${styles.spacing.sm2};
  gap: ${styles.spacing.sm2};
`;

export const CenteredFlexRow = styled(Flex)<{ gap:number }>`
  flex-direction: row;
  justify-content: center;
  gap: ${(props) => `${props.gap ? props.gap : 0}px`};

`;

export const SpaceBetweenFlexRow = styled(Flex)`
  flex-direction: row;
  justify-content: space-between;
`;
