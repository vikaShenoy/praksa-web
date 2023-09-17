import styled, { css } from "styled-components"
import { mobile } from "../../utils/breakpoints"

export const TitleText = styled.p`
  font-family: ${(props) => props.theme.typography.font.title};
  font-size: ${(props) => props.theme.typography.size.md};
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.text.primary};

  font-size: ${(props) => props.theme.typography.size.md};
  ${mobile(css`
    font-size: ${(props) => props.theme.typography.size.smmd};
  `)}
`

export const Label = styled.label`
  font-size: ${(props) => props.theme.typography.size.xs};
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: 0;
`

export const BodyText = styled.p<{ uppercase?: boolean }>`
  color: ${(props) => props.theme.colors.text.primary};
  ${(props) => props.uppercase && css`text-transform: uppercase;`}

  font-size: ${(props) => props.theme.typography.size.sm};
`

export const ErrorText = styled(Label)`
  color: ${(props) => props.theme.colors.text.error};
`

export const BoldText = styled.p`
  font-weight: ${(props) => props.theme.typography.weight.bold};
  color: ${(props) => props.theme.colors.text.primary};

  font-size: ${(props) => props.theme.typography.size.mdlg};
  ${mobile(css`
    font-size: ${(props) => props.theme.typography.size.md};
  `)}
`

export const H2 = styled.h2`
  font-weight: ${(props) => props.theme.typography.weight.bold};
  font-size: ${(props) => props.theme.typography.size.smmd};
  color: ${(props) => props.theme.colors.text.primary};
`