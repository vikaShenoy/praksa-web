import { IoMdPlay } from 'react-icons/io';
import { IoStopSharp } from 'react-icons/io5';
import IconButton, { ButtonSize } from './IconButton';

interface Props {
  isPlaying: boolean;
  onClick: () => void;
}

// TODO: test
const PlayStopButton = ({ isPlaying, onClick }: Props) => {
  return (
    <IconButton
      iconName={isPlaying ? IoStopSharp : IoMdPlay}
      onClick={onClick}
      size={ButtonSize.LARGE}
      ariaLabel="play-stop"
    />
  );
};

export default PlayStopButton;
