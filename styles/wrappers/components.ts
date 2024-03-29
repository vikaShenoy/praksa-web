import styled, { css } from "styled-components";
import { mobile } from "../../utils/breakpoints";

export const Card = styled.div<{ gridArea: string }>`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;

  grid-area: ${(props) => props.gridArea};
  
  min-height: 500px;

  background-color: ${(props) => props.theme.colors.primary};
  border-radius: 1.5rem;
  box-shadow: ${(props) => props.theme.shadows.md};
  
  &:hover {
    box-shadow: ${(props) => props.theme.shadows.mdDark};
  };
  transition: box-shadow 0.2s;
  
  padding: ${(props) => props.theme.spacing.lg};
  ${mobile(css`
    padding: ${(props) => props.theme.spacing.sm};
  `)}
`

export const Input = styled.input`
  background-color: ${(props) => props.theme.colors.faded};
  font-size: ${(props) => props.theme.typography.size.sm};
  color: ${(props) => props.theme.colors.text.primary};
  height: 2.5rem;
  padding: 0.5rem 1rem;
  outline: none;
  border: none;

  position: relative;

  width: 100%;

  &::-webkit-inner-spin-button, ::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
`