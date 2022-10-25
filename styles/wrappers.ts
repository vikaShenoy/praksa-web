import styled from 'styled-components'

// CONTAINERS

export const Flex = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: ${(props) => props.theme.spacing.sm};
  gap: ${(props) => props.theme.spacing.sm};
`

export const CenteredFlexRow = styled(Flex)<{ gap: number }>`
  flex-direction: row;
  justify-content: center;
  gap: ${(props) => `${props.gap ? props.gap : 0}px`};
`

export const SpaceBetweenFlexRow = styled(Flex)`
  flex-direction: row;
  justify-content: space-between;
`

// COMPONENTS

export const Card = styled.div`
  display: flex;
  min-height: 340px;
  flex-direction: column;
  align-items: center;
  background: ${(props) => props.theme.colors.primary};
  border-radius: ${(props) => props.theme.sizes.borderRadius};
  box-shadow: ${(props) => props.theme.shadows.md};
  padding: ${(props) => props.theme.spacing.xxl}
    ${(props) => props.theme.spacing.md};

  &:hover {
    box-shadow: ${(props) => props.theme.shadows.mdDark};
  }

  transition: box-shadow 0.2s;
`
