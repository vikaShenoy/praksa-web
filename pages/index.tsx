import type { NextPage } from 'next';
import Head from 'next/head';
import Metronome from '../components/Metronome';

const Home: NextPage = () => {
  return (
    <section>
      <Head>
        <title>Praksa - Home</title>
      </Head>

      <Metronome />
    </section>
  );
};

export default Home;
