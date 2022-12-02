import type { NextPage } from 'next'
import Head from 'next/head'
import Metronome from '../components/metronome/Metronome'
import Notes from '../components/notes/Notes'
import Timer from '../components/timer/Timer'
import { Flex } from '../styles/wrappers/containers'

const Home: NextPage = () => {
  return (
    <section>
      <Head>
        <title>Praksa - Home</title>
      </Head>
      <Flex>
        <Metronome />
        <Timer />
        <Notes />
      </Flex>
    </section>
  )
}

export default Home
