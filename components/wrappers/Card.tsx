import styled from 'styled-components';
import { styles } from '../../styles/styles';

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${(props) => props.theme.colors.primary};
  border-radius: ${styles.borderRadius.md};
  box-shadow: ${(props) => props.theme.shadows.card};
  padding: ${styles.spacing.lg} ${styles.spacing.md};

  &:hover {
    box-shadow: ${(props) => props.theme.shadows.cardHover};
  }
`;
