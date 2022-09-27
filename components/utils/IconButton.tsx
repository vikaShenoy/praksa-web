import styled from 'styled-components';

export enum ButtonSize {
  SMALL = 24,
  LARGE = 48,
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
    box-shadow: ${(props) => props.theme.shadows.buttonHover};
  }
`;

interface Props {
  size: ButtonSize;
  Icon: React.ReactNode;
}

const IconButton = ({ size, Icon }: Props) => {
  return (
    <Button size={size}>
      {Icon}
    </Button>
  );
};

export default IconButton;
