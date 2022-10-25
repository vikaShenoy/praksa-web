// FONTS

import styled from "styled-components"

export const TitleText = styled.p`
  font-family: ${(props) => props.theme.typography.font.title};
  font-size: ${(props) => props.theme.typography.size.md};
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0;
`

export const BodyText = styled.p`
  font-family: ${(props) => props.theme.typography.font.body};
  font-size: ${(props) => props.theme.typography.size.sm};
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0;
`

export const FieldLabelText = styled(BodyText)`
  font-size: ${(props) => props.theme.typography.size.xssm};
`

export const BoldText = styled.p`
  font-family: ${(props) => props.theme.typography.font.body};
  font-weight: ${(props) => props.theme.typography.weight.bold};
  font-size: ${(props) => props.theme.typography.size.lg};
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0;
`

export const H2 = styled.h2`
  font-family: ${(props) => props.theme.typography.font.body};
  font-weight: ${(props) => props.theme.typography.weight.bold};
  font-size: ${(props) => props.theme.typography.size.smmd};
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0;
`

export const PrimaryBtnText = styled.p`
  font-family: ${(props) => props.theme.typography.font.body};
  font-weight: ${(props) => props.theme.typography.weight.regular};
  font-size: ${(props) => props.theme.typography.size.sm};
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0;
`

export const SecondaryBtnText = styled.p`
  font-family: ${(props) => props.theme.typography.font.body};
  font-weight: ${(props) => props.theme.typography.weight.regular};
  font-size: ${(props) => props.theme.typography.size.xs};
  color: ${(props) => props.theme.colors.accent};
  margin: 0;
  text-transform: uppercase;
`