import styled from 'styled-components'

export const TitleText = styled.p`
  font-family: ${(props) => props.theme.typography.font.title};
  font-size: ${(props) => props.theme.typography.size.md};
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.text.primary};
`

export const BodyText = styled.p`
  font-family: ${(props) => props.theme.typography.font.body};
  font-size: ${(props) => props.theme.typography.size.sm};
  color: ${(props) => props.theme.colors.text.primary};
`

export const BoldText = styled.p`
  font-family: ${(props) => props.theme.typography.font.body};
  font-weight: ${(props) => props.theme.typography.weight.bold};
  font-size: ${(props) => props.theme.typography.size.lg};
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0;
`
