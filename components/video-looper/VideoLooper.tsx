import { useEffect, useState } from 'react'
import { IoSearchSharp } from 'react-icons/io5'
import { MdDelete, MdOutlineRestartAlt } from 'react-icons/md'
import styled from 'styled-components'
import { Card, Input } from '../../styles/wrappers/components'
import CircleIconButton, {
  ButtonSize
} from '../buttons/circle-icon-button/CircleIconButton'
import IconButton from '../buttons/icon-button/IconButton'
import PlayStopButton from '../buttons/play-stop-btn/PlayStopButton'

const VideoCard = styled(Card)`
  gap: ${(props) => props.theme.spacing.sm};
  flex-direction: column;
  justify-content: space-evenly;
`

const Video = styled.video`
  height: 100%;
  align-self: flex-start;

  border-radius: 1rem;
  overflow: hidden;

  width: 100%;
  max-width: 100%;
`

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
`

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`

const SearchIconWrapper = styled.div`
  position: absolute;
  right: 1rem;
  cursor: pointer;
`

const BottomControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

enum YTPlayerStates {
  PLAY = 1,
  PAUSE = 2,
}

const VideoLooper = () => {
  const [player, setPlayer] = useState<YT.Player | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const id = 'PbrP9RbSIWo'

  useEffect(() => {
    const win = window as any
    if (!win.YT) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'

      win.onYouTubeIframeAPIReady = loadVideo

      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)
    } else {
      loadVideo()
    }
  }, [])

  const loadVideo = () => {
    const youTubePlayer = new YT.Player(`youtube-player-${id}`, {
      videoId: id,
      events: {
        onStateChange: onPlayerStateChange,
      },
    })

    setPlayer(youTubePlayer)
  }

  const onPlayerStateChange = (event: any) => {
    if (event.data === YTPlayerStates.PLAY) {
      player?.seekTo(30, false)
    } else {
      console.log('Not playting')
    }
  }

  const onSearch = () => {
    console.log('TODO: search button clicked')
  }

  const onReset = () => {
    console.log('TODO: reset button clicked')
  }

  const onClear = () => {
    console.log('TODO: clear button clicked')
  }

  return (
    <VideoCard gridArea="videoLooper">
      <Video id={`youtube-player-${id}`} />

      <ControlsContainer>
        <PlayStopButton
          isPlaying={isPlaying}
          onClick={() => setIsPlaying((prev) => !prev)}
        />
        <CircleIconButton
          iconName={MdOutlineRestartAlt}
          size={ButtonSize.LARGE}
          onClick={onReset}
          ariaLabel="Reset video looper button"
        />
        <CircleIconButton
          iconName={MdDelete}
          size={ButtonSize.LARGE}
          onClick={onClear}
          ariaLabel="Clear video looper button"
        />
      </ControlsContainer>

      <BottomControlsContainer>
        <SearchContainer>
          <Input />
          <SearchIconWrapper>
            <IconButton iconName={IoSearchSharp} onClick={onSearch} />
          </SearchIconWrapper>
        </SearchContainer>
      </BottomControlsContainer>
    </VideoCard>
  )
}

export default VideoLooper
