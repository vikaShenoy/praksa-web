import type { NextPage } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import Navbar from '../components/navbar/Navbar';
import Theme from '../components/Theme';

const APP_TITLE = "Praksa";

const Background = styled.div`
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
        <title>{APP_TITLE}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Proza+Libre&display=swap" rel="stylesheet" />
      </Head>
      <Background>
        <Navbar />
      </Background>
    </Theme>
  );
};

export default Home;
