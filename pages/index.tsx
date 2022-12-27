import type { NextPage } from 'next'
import Head from 'next/head'
import Exercises from '../components/exercises/Exercises'
import Metronome from '../components/metronome/Metronome'
import Notes from '../components/notes/Notes'
import Timer from '../components/timer/Timer'
import Tuner from '../components/tuner/Tuner'
import VideoLooper from '../components/video-looper/VideoLooper'
import { CenteredFlexRow } from '../styles/wrappers/containers'

const Home: NextPage = () => {
  return (
    <section>
      <Head>
        <title>Praksa - Home</title>
      </Head>
      <CenteredFlexRow gap={16}>
        <Metronome />
        <Timer />
        <Exercises />
        <Notes />
      </CenteredFlexRow>
      <CenteredFlexRow gap={16}>
        <VideoLooper />
        <Tuner />
      </CenteredFlexRow>
    </section>
  )
}

export default Home
