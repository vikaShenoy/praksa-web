import { IoMdPlay } from 'react-icons/io'
import { IoStopSharp } from 'react-icons/io5'
import IconButton, { ButtonSize } from '../circle-icon-button/CircleIconButton'

interface Props {
  isPlaying: boolean
  onClick: () => void
}

const PlayStopButton = ({ isPlaying, onClick }: Props) => {
  return (
    <IconButton
      iconName={isPlaying ? IoStopSharp : IoMdPlay}
      onClick={onClick}
      size={ButtonSize.LARGE}
      ariaLabel={isPlaying ? 'stop-button' : 'play-button'}
    />
  )
}

export default PlayStopButton
