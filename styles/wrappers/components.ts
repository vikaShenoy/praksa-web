import styled from "styled-components";

export const Card = styled.div<{ isMobile: boolean }>`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;

  min-height: 416px;
  min-width: ${(props) => props.theme.sizes.components.minCardWidth};
  width: ${(props) => (props.isMobile ? '100%' : '22%')};

  flex: 1;

  background: ${(props) => props.theme.colors.primary};
  border-radius: ${(props) => props.theme.sizes.borderRadius};
  box-shadow: ${(props) => props.theme.shadows.md};
  padding: ${(props) => props.theme.spacing.xxl} ${(props) => props.theme.spacing.md};

  &:hover {
    box-shadow: ${(props) => props.theme.shadows.mdDark};
  };

  transition: box-shadow 0.2s;
`

export const Input = styled.input`
  background-color: ${(props) => props.theme.colors.disabled};
  font-family: ${(props) => props.theme.typography.font.body};
  font-size: ${(props) => props.theme.typography.size.sm};
  color: ${(props) => props.theme.colors.text.primary};
  height: 2rem;
  padding: 0.5rem 1rem;
  outline: none;
  border: none;

  &::-webkit-inner-spin-button, ::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
`