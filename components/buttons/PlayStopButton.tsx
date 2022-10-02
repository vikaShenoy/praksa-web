import { IoMdPlay } from 'react-icons/io';
import { IoStopSharp } from 'react-icons/io5';
import styled from 'styled-components';
import IconButton, { ButtonSize } from './IconButton';

const PlayIcon = styled(IoMdPlay)`
  color: ${(props) => props.theme.colors.icon};
  font-size: 32px;
  margin-left: 2px;
`;

const StopIcon = styled(IoStopSharp)`
  color: ${(props) => props.theme.colors.icon};
  font-size: 32px;
`;

interface Props {
  isPlaying: boolean;
  onClick: () => void;
}

// TODO: test
const PlayStopButton = ({ isPlaying, onClick }: Props) => {
  return (
    <IconButton
      onClick={onClick}
      size={ButtonSize.LARGE}
      Icon={
        isPlaying ? (
          <StopIcon aria-label="stop" />
        ) : (
          <PlayIcon aria-label="play" />
        )
      }
      ariaLabel="play-stop"
    />
  );
};

export default PlayStopButton;
