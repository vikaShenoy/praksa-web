import React, { useEffect, useRef, useState } from 'react'
import { IoSearchSharp } from 'react-icons/io5'
import { MdDelete, MdOutlineRestartAlt } from 'react-icons/md'
import styled from 'styled-components'
import { TABLET_BREAKPOINT } from '../../hooks/useResponsive'
import { Card, Input } from '../../styles/wrappers/components'
import CircleIconButton, {
  ButtonSize
} from '../buttons/circle-icon-button/CircleIconButton'
import IconButton from '../buttons/icon-button/IconButton'
import PlayStopButton from '../buttons/play-stop-btn/PlayStopButton'
import NoVideoPlaceholder from './no-video-placeholder/NoVideoPlaceholder'

const VideoCard = styled(Card)`
  flex-direction: column;
  justify-content: space-evenly;
  gap: ${(props) => props.theme.spacing.sm};
`

const Video = styled.video`
  height: 100%;
  width: 100%;

  border-radius: 1rem;
  overflow: hidden;

  min-height: 250px;
  @media (min-width: ${TABLET_BREAKPOINT}px) {
    min-height: 380px;
  }
`

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.theme.spacing.md};
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
  const searchInputRef = useRef<HTMLInputElement>(null)

  const [videoID, setVideoID] = useState(null)

  const loadVideo = () => {
    // const youTubePlayer = new YT.Player(`youtube-player-${videoID}`, {
    //   videoId: videoID,
    //   events: {
    //     onStateChange: onPlayerStateChange,
    //   },
    // })

    // setPlayer(youTubePlayer)
  }

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
  }, [loadVideo])

  const onPlayerStateChange = (event: any) => {
    console.log('TODO: player state change')
  }

  const onPlay = () => {
    console.log('TODO: play button clicked')
    setIsPlaying(true)
  }

  const onStop = () => {
    console.log('TODO: stop button clicked')
    setIsPlaying(false)
  }

  const onReset = () => {
    console.log('TODO: reset button clicked')
  }

  const onClear = () => {
    console.log('TODO: clear button clicked')
  }

  const onSearchboxKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      onSearch()
    }
  }

  const onSearch = () => {
    console.log(
      `TODO: handle search. Current val: ${searchInputRef.current!.value}`
    )
  }

  return (
    <VideoCard gridArea="videoLooper">
      {videoID ? (
        <Video id={`youtube-player-${videoID}`} />
      ) : (
        <NoVideoPlaceholder />
      )}

      <ControlsContainer>
        <CircleIconButton
          iconName={MdOutlineRestartAlt}
          size={ButtonSize.LARGE}
          onClick={onReset}
          ariaLabel="Reset video looper button"
        />
        <PlayStopButton
          isPlaying={isPlaying}
          onClick={isPlaying ? onStop : onPlay}
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
          <Input
            type="text"
            onKeyDown={onSearchboxKeyDown}
            ref={searchInputRef}
          />
          <SearchIconWrapper>
            <IconButton iconName={IoSearchSharp} onClick={onSearch} />
          </SearchIconWrapper>
        </SearchContainer>
      </BottomControlsContainer>
    </VideoCard>
  )
}

export default VideoLooper
