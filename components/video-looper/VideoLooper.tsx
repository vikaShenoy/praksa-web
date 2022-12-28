import { useEffect, useState } from 'react'
import { IoSearchSharp } from 'react-icons/io5'
import styled from 'styled-components'
import { Card, Input } from '../../styles/wrappers/components'
import IconButton from '../buttons/icon-button/IconButton'

const VideoCard = styled(Card)`
  flex-direction: row;
  gap: ${(props) => props.theme.spacing.sm};
`

const Video = styled.video`
  /* height: 200px; */
  width: 50%;
  height: 100%;
  flex: 1.5;
  border-radius: 1rem;
  overflow: hidden;
`

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

const SearchIconWrapper = styled.div`
  position: absolute;
  right: 1rem;
  cursor: pointer;
`

const VideoControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  height: 100%;

  flex: 1;
`

enum YTPlayerStates {
  PLAY = 1,
  PAUSE = 2,
}

const VideoLooper = () => {
  const [player, setPlayer] = useState<YT.Player | null>(null)

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

  return (
    <VideoCard gridArea='videoLooper'>
      {/* <Video
        src="https://www.youtube.com/embed/PbrP9RbSIWo"
        title="YouTube video player"
        ref={videoRef}
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></Video> */}
      <Video id={`youtube-player-${id}`}></Video>
      <VideoControlsContainer>
        <SearchContainer>
          <Input />
          <SearchIconWrapper>
            <IconButton iconName={IoSearchSharp} onClick={onSearch} />
          </SearchIconWrapper>
        </SearchContainer>
      </VideoControlsContainer>
    </VideoCard>
  )
}

export default VideoLooper
