import styled from 'styled-components'
import { styles } from '../styles'

export const TitleText = styled.p`
  font-family: ${styles.font.title};
  font-size: ${styles.fontSize.md};
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.primaryText};
`

export const BodyText = styled.p`
  font-family: ${styles.font.body};
  font-size: ${styles.fontSize.sm};
  color: ${(props) => props.theme.colors.primaryText};
`

export const BoldText = styled.p`
  font-family: ${styles.font.body};
  font-weight: bold;
  font-size: ${styles.fontSize.lg};
  color: ${(props) => props.theme.colors.primaryText};
  margin: 0;
`
