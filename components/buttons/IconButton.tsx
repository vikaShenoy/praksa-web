import { IconType } from 'react-icons'
import styled from 'styled-components'

export enum ButtonSize {
  SMALL = 32,
  LARGE = 64,
}

const Button = styled.button<{ size: ButtonSize }>`
  display: flex;
  align-items: center;

  height: ${(props) => `${props.size}px`};
  width: ${(props) => `${props.size}px`};
  border-radius: 50%;
  border: none;
  padding: ${(props) => `${props.size / 4}px`};

  background-color: ${(props) => props.theme.colors.secondary};
  cursor: pointer;

  &:hover {
    box-shadow: ${(props) => props.theme.shadows.md};
  }
`

const Icon = styled.div<{ size: ButtonSize }>`
  color: ${(props) => props.theme.colors.icon};
  font-size: ${(props) => `${props.size * (2 / 3)}px`};
`
interface Props {
  iconName: IconType
  size: ButtonSize
  onClick: () => void
  ariaLabel: string
}

const IconButton = ({ iconName, onClick, size, ariaLabel }: Props) => {
  return (
    <Button
      onClick={onClick}
      size={size}
      name={ariaLabel}
      aria-label={ariaLabel}
      role="button"
    >
      <Icon as={iconName} size={size} />
    </Button>
  )
}

export default IconButton
