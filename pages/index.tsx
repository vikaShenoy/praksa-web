import type { NextPage } from 'next'
import Head from 'next/head'
import styled from 'styled-components'
import Exercises from '../components/exercises/Exercises'
import Metronome from '../components/metronome/Metronome'
import Notes from '../components/notes/Notes'
import Timer from '../components/timer/Timer'
import Tuner from '../components/tuner/Tuner'
import VideoLooper from '../components/video-looper/VideoLooper'

const HomepageGrid = styled.section`
  display: grid;
  gap: ${(props) => props.theme.spacing.sm};

  padding: ${(props) => props.theme.spacing.sm};

  grid-template-areas: 
    "metronome timer exercises notes"
    "videoLooper videoLooper tuner tuner";
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
      {/* 
      <CenteredFlexRow gap={16}>
        <Metronome />
        <Timer />
        <Exercises />
        <Notes />
      </CenteredFlexRow>
      <CenteredFlexRow gap={16}>
        <VideoLooper />
        <Tuner />
      </CenteredFlexRow> */}
    </section>
  )
}

export default Home
