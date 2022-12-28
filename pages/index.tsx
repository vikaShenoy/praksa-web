import type { NextPage } from 'next'
import Head from 'next/head'
import styled from 'styled-components'
import Exercises from '../components/exercises/Exercises'
import Metronome from '../components/metronome/Metronome'
import Notes from '../components/notes/Notes'
import Timer from '../components/timer/Timer'
import Tuner from '../components/tuner/Tuner'
import VideoLooper from '../components/video-looper/VideoLooper'
import { DESKTOP_BREAKPOINT, TABLET_BREAKPOINT } from '../hooks/useResponsive'
import { NAVBAR_HEIGHT } from '../styles/size'

const HomepageGrid = styled.section`
  display: grid;
  gap: ${(props) => props.theme.spacing.xs};
  padding: ${(props) => props.theme.spacing.xs};

  /* height: calc(100vh - ${NAVBAR_HEIGHT}); */

  grid-auto-columns: minmax(0, 1fr);
  grid-auto-flow: column;

  grid-auto-rows: minmax(0, 1fr);

  // Mobile
  grid-template-areas:
    'metronome'
    'timer'
    'exercises'
    'notes'
    'videoLooper'
    'tuner';

  @media (min-width: ${TABLET_BREAKPOINT}px) {
    gap: ${(props) => props.theme.spacing.sm};
    padding: ${(props) => props.theme.spacing.sm};
    grid-template-areas:
      'metronome timer'
      'exercises notes'
      'videoLooper videoLooper'
      'tuner tuner';
  }

  @media (min-width: ${DESKTOP_BREAKPOINT}px) {
    grid-template-areas:
      'metronome timer exercises notes'
      'videoLooper videoLooper tuner tuner';
  }
`

const Home: NextPage = () => {
  return (
    <section>
      <Head>
        <title>Praksa - Home</title>
      </Head>

      <HomepageGrid>
        <Metronome />
        <Timer />
        <Exercises />
        <Notes />
        <VideoLooper />
        <Tuner />
      </HomepageGrid>
    </section>
  )
}

export default Home
