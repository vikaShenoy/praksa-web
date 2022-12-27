import styled, { css } from 'styled-components'
import { BodyText } from '../../../styles/wrappers/fonts'

const Button = styled.button<{ isFluid?: boolean }>`
  border-radius: 0.5rem;
  height: 3rem;
  width: ${(props) => (props.isFluid ? 'auto' : '140px')};
  background-color: ${(props) => props.theme.colors.secondary};
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.secondaryHover};
  }

  ${(props) =>
    props.isFluid &&
    css`
      flex: 1;
    `}
`

interface PrimaryBtnProps {
  text: string
  disabled?: boolean
  isSubmitBtn?: boolean
  onClick?: () => void
  isFluid?: boolean
}

const PrimaryBtn: React.FC<PrimaryBtnProps> = ({
  text,
  onClick,
  disabled,
  isSubmitBtn,
  isFluid,
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      type={isSubmitBtn ? 'submit' : 'button'}
      isFluid={isFluid}
    >
      <BodyText uppercase>{text}</BodyText>
    </Button>
  )
}

export default PrimaryBtn
