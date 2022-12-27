import { IconType } from 'react-icons'
import styled from 'styled-components'

const Icon = styled.button`
  color: ${(props) => props.theme.colors.icon};
  cursor: pointer;
`

interface IconButtonProps {
  iconName: IconType
  onClick: () => void
}

const IconButton: React.FC<IconButtonProps> = ({ iconName, onClick }) => {
  return <Icon as={iconName} onClick={onClick} role="button" />
}

export default IconButton
