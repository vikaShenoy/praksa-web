import styled, { useTheme } from 'styled-components'

interface Props {
  onClick: () => void
  text: string
}

const Container = styled.button`
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

const Text = styled.p`
  margin: 0;
  text-transform: uppercase;
  font-family: ${(props) => props.theme.typography.font.body};
  font-size: ${(props) => props.theme.typography.size.xs};
`

const SecondaryBtn = ({ onClick, text }: Props) => {
  const theme = useTheme()

  return (
    <Container onClick={onClick}>
      <Text>{text}</Text>
    </Container>
  )
}

export default SecondaryBtn
