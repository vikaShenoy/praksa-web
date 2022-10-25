import styled from 'styled-components'
import { SecondaryBtnText } from '../../../styles/fonts'

interface Props {
  onClick: () => void
  text: string
}

const Button = styled.button`
  display: flex;
  align-items: center;
  background: none;
  justify-content: center;
  padding: ${(props) => `${props.theme.spacing.xs} ${props.theme.spacing.sm}`};
  border: ${(props) => `1px solid ${props.theme.colors.accent}`};
  border-radius: 0.5rem;
  color: ${(props) => props.theme.colors.accent};
  cursor: pointer;

  &:hover {
    border: ${(props) => `1px solid ${props.theme.colors.accentHover}`};
    color: ${(props) => props.theme.colors.accentHover};
  }
`

const SecondaryBtn = ({ onClick, text }: Props) => {
  return (
    <Button onClick={onClick} role="button" type="button">
      <SecondaryBtnText>{text}</SecondaryBtnText>
    </Button>
  )
}

export default SecondaryBtn
