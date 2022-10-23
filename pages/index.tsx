import type { NextPage } from 'next'
import Head from 'next/head'
import Metronome from '../components/metronome/Metronome'
import Timer from '../components/timer/Timer'
import ViewGroups from '../components/view-groups/ViewGroups'
import { Flex } from '../styles/wrappers'

const Home: NextPage = () => {
  return (
    <section>
      <Head>
        <title>Praksa - Home</title>
      </Head>
      <Flex>
        <Metronome />
        <Timer />
        <ViewGroups groups={[]} />
      </Flex>
    </section>
  )
}

export default Home
