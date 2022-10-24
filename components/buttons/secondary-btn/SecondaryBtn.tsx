import styled, { useTheme } from 'styled-components'
import { BodyText } from '../../../styles/wrappers'

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

const Text = styled(BodyText)`
  text-transform: uppercase;
  font-size: ${(props) => props.theme.typography.size.smmd};
`

const SecondaryBtn = ({ onClick, text }: Props) => {
  const theme = useTheme()

  return (
    <Button onClick={onClick} role="button" type="button">
      <Text>{text}</Text>
    </Button>
  )
}

export default SecondaryBtn
