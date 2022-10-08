import styled from 'styled-components'

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
