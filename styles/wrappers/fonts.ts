import styled, { css } from "styled-components"

export const TitleText = styled.p`
  font-family: ${(props) => props.theme.typography.font.title};
  font-size: ${(props) => props.theme.typography.size.md};
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.text.primary};
`

export const Label = styled.label`
  font-family: ${(props) => props.theme.typography.font.body};
  font-size: ${(props) => props.theme.typography.size.xs};
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: 0;
`

export const BodyText = styled.p<{ uppercase?: boolean }>`
  font-family: ${(props) => props.theme.typography.font.body};
  font-size: ${(props) => props.theme.typography.size.sm};
  color: ${(props) => props.theme.colors.text.primary};
  ${(props) => props.uppercase && css`text-transform: uppercase;`}
`

export const ErrorText = styled(Label)`
  color: ${(props) => props.theme.colors.text.error};
`

export const BoldText = styled.p`
  font-family: ${(props) => props.theme.typography.font.body};
  font-weight: ${(props) => props.theme.typography.weight.bold};
  font-size: ${(props) => props.theme.typography.size.mdlg};
  color: ${(props) => props.theme.colors.text.primary};
`

export const H2 = styled.h2`
  font-family: ${(props) => props.theme.typography.font.body};
  font-weight: ${(props) => props.theme.typography.weight.bold};
  font-size: ${(props) => props.theme.typography.size.smmd};
  color: ${(props) => props.theme.colors.text.primary};
`