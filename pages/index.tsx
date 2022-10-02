import type { NextPage } from 'next';
import Head from 'next/head';
import Metronome from '../components/Metronome';
import Timer from '../components/Timer';
import { Flex } from '../components/wrappers/Containers';

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
