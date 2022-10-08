import styled from 'styled-components'

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${(props) => props.theme.colors.primary};
  border-radius: ${(props) => props.theme.sizes.borderRadius};
  box-shadow: ${(props) => props.theme.shadows.md};
  padding: ${(props) => props.theme.spacing.xxl} ${(props) => props.theme.spacing.md};

  &:hover {
    box-shadow: ${(props) => props.theme.shadows.md};
  }
`
