import styled from "styled-components";

export const Card = styled.div<{ gridArea: string }>`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;

  grid-area: ${(props) => props.gridArea};

  min-height: 400px;
  height: 500px;
  min-width: 20rem;

  background: ${(props) => props.theme.colors.primary};
  border-radius: 1.5rem;
  box-shadow: ${(props) => props.theme.shadows.md};
  padding: ${(props) => props.theme.spacing.xxl} ${(props) => props.theme.spacing.md};

  &:hover {
    box-shadow: ${(props) => props.theme.shadows.mdDark};
  };
  transition: box-shadow 0.2s;
`

export const Input = styled.input`
  background-color: ${(props) => props.theme.colors.faded};
  font-family: ${(props) => props.theme.typography.font.body};
  font-size: ${(props) => props.theme.typography.size.sm};
  color: ${(props) => props.theme.colors.text.primary};
  height: 3rem;
  padding: 0.5rem 1rem;
  outline: none;
  border: none;

  position: relative;

  width: 100%;

  &::-webkit-inner-spin-button, ::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
`