import styled from 'styled-components';

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

  margin: 0 8px;

  background-color: ${(props) => props.theme.colors.secondary};
  cursor: pointer;

  &:hover {
    box-shadow: ${(props) => props.theme.shadows.buttonHover};
  }
`;

interface Props {
  size: ButtonSize;
  Icon: React.ReactNode;
  onClick: () => void;
  ariaLabel: string;
}

const IconButton = ({ Icon, size, onClick, ariaLabel }: Props) => {
  return (
    <Button onClick={onClick} size={size} aria-label={ariaLabel}>
      {Icon}
    </Button>
  );
};

export default IconButton;
