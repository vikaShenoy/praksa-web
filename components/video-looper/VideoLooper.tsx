import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IoSearchSharp } from 'react-icons/io5'
import styled from 'styled-components'
import { TABLET_BREAKPOINT } from '../../hooks/useResponsive'
import { Card, Input } from '../../styles/wrappers/components'
import { BodyText } from '../../styles/wrappers/fonts'
import IconButton from '../buttons/icon-button/IconButton'

const VideoCard = styled(Card)`
  flex-direction: column;
  justify-content: space-evenly;
  gap: ${(props) => props.theme.spacing.sm};
`

const VideoContainer = styled.div`
  position: relative;

  height: 100%;
  min-height: 225px;
  width: 100%;

  border-radius: 1rem;
  overflow: hidden;

  @media (min-width: ${TABLET_BREAKPOINT}px) {
    min-height: 380px;
  }
`

const Video = styled.video<{ isVisible: boolean }>`
  height: 100%;
  width: 100%;

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const NoVideoContainer = styled.div<{ isVisible: boolean }>`
  height: 100%;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${(props) => props.theme.colors.background};

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  padding: ${(props) => props.theme.spacing.md};

  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
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

// TODO: Test
const VideoLooper = () => {
  const { t } = useTranslation()
  const [player, setPlayer] = useState<YT.Player | null>(null)
  const [videoID, setVideoID] = useState<string | null>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const win = window as any
    if (!win.YT) {
      const win = window as any
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      win.onYouTubeIframeAPIReady = loadPlayer
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)
    } else {
      loadPlayer()
    }
  }, [])

  const loadPlayer = () => {
    const youTubePlayer = new YT.Player('player')
    setPlayer(youTubePlayer)
  }

  const loadVideo = (url: string) => {
    if (!player) {
      return
    }

    const videoId = url.split('=')[1]
    if (videoId) {
      try {
        player.loadVideoById(videoId)
        setVideoID(videoId)
      } catch (error) {
        // TODO: Show some kind of error message
      }
    } else {
      // TODO: Show some kind of error message
    }
  }

  const onSearch = () => {
    const currentSearchVal = searchInputRef.current!.value
    if (currentSearchVal && player) {
      loadVideo(currentSearchVal)
    }
  }

  const onSearchboxKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      onSearch()
    }
  }

  return (
    <VideoCard gridArea="videoLooper">
      <VideoContainer>
        <Video id="player" isVisible={!!videoID} />
        <NoVideoContainer isVisible={!videoID}>
          <BodyText>{t('video_looper.placeholder')}</BodyText>
        </NoVideoContainer>
      </VideoContainer>

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
