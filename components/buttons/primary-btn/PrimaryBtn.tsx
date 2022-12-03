import styled from 'styled-components'
import { BodyText } from '../../../styles/wrappers/fonts'

interface PrimaryBtnProps {
  text: string
  onClick?: () => void
  disabled?: boolean
  isSubmitBtn?: boolean
}

const Button = styled.button`
  border-radius: 0.5rem;
  height: 3rem;
  width: 140px;
  background-color: ${(props) => props.theme.colors.secondary};
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.secondaryHover};
  }
`

const PrimaryBtn = ({
  text,
  onClick,
  disabled,
  isSubmitBtn,
}: PrimaryBtnProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      type={isSubmitBtn ? 'submit' : 'button'}
    >
      <BodyText uppercase>{text}</BodyText>
    </Button>
  )
}

export default PrimaryBtn
