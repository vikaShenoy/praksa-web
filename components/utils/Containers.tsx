import styled from 'styled-components';

export const Flex = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

export const CenteredFlexRow = styled(Flex)`
  flex-direction: row;
  justify-content: center;
`;

export const SpaceBetweenFlexRow = styled(Flex)`
  flex-direction: row;
  justify-content: space-between;
`;
