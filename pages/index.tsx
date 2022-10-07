import type { NextPage } from 'next';
import Head from 'next/head';
import Metronome from '../components/metronome/Metronome';
import Timer from '../components/timer/Timer';
import { Flex } from '../styles/wrappers/Containers';

const Home: NextPage = () => {
  return (
    <section>
      <Head>
        <title>Praksa - Home</title>
      </Head>
      <Flex>
        <Metronome />
        <Timer />
      </Flex>
    </section>
  );
};

export default Home;
