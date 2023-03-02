import styled, { css } from 'styled-components'
import { BodyText } from '../../../styles/wrappers/fonts'

const Button = styled.button<{ isFluid?: boolean }>`
  border-radius: 0.5rem;
  height: 3rem;
  width: ${(props) => (props.isFluid ? 'auto' : '140px')};
  background-color: ${(props) => props.theme.colors.secondary};
  border: none;
  cursor: pointer;
  
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.theme.spacing.xs};

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
  children?: JSX.Element
  lowercase?: boolean
}

const PrimaryBtn: React.FC<PrimaryBtnProps> = ({
  text,
  onClick,
  disabled,
  isSubmitBtn,
  isFluid,
  children,
  lowercase
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      type={isSubmitBtn ? 'submit' : 'button'}
      isFluid={isFluid}
      role="button"
    >
      <BodyText uppercase={!lowercase}>{text}</BodyText>
      {children}
    </Button>
  )
}

export default PrimaryBtn
