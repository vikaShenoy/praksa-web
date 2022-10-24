import styled, { css } from 'styled-components'
import { BodyText } from '../../../styles/wrappers'

const Button = styled.button<{ disabled: boolean }>`
  background-color: ${(props) =>
    props.disabled
      ? props.theme.colors.disabled
      : props.theme.colors.secondary};
  padding: ${(props) => `${props.theme.spacing.sm} ${props.theme.spacing.md}`};

  ${(props) =>
    !props.disabled &&
    css`
      &:hover {
        background-color: props.theme.colors.secondaryHover;
      }
      cursor: pointer;
    `}
`

const Text = styled(BodyText)`
  text-transform: uppercase;
`

interface Props {
  onClick: () => void
  text: string
  disabled: boolean
}

const PrimaryBtn = ({ onClick, text, disabled }: Props) => {
  return (
    <Button
      role="button"
      type="button"
      disabled={disabled}
      onClick={() => {
        if (!disabled) {
          onClick()
        }
      }}
    >
      <Text>{text}</Text>
    </Button>
  )
}

export default PrimaryBtn
