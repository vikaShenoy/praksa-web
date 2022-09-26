import type { NextPage } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import Theme from '../components/Theme';

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.colors.background};
`;

const Home: NextPage = () => {
  return (
    <Theme>
      <Head>
        <title>Praksa</title>
      </Head>
      <BackgroundContainer></BackgroundContainer>
    </Theme>
  );
};

export default Home;
