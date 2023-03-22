import type { NextPage } from 'next'
import { signIn, useSession } from 'next-auth/react'
import Head from 'next/head'
import { Toaster } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { FcGoogle } from 'react-icons/fc'
import styled, { useTheme } from 'styled-components'
import PrimaryBtn from '../components/buttons/primary-btn/PrimaryBtn'
import { ExerciseCard } from '../components/exercises/ExerciseCard'
import Metronome from '../components/metronome/Metronome'
import Notes from '../components/notes/Notes'
import Timer from '../components/timer/Timer'
import Tuner from '../components/tuner/Tuner'
import VideoLooper from '../components/video-looper/VideoLooper'
import { DESKTOP_BREAKPOINT, TABLET_BREAKPOINT } from '../hooks/useResponsive'

const HomepageGrid = styled.section`
  display: grid;
  gap: ${(props) => props.theme.spacing.xs};
  padding: ${(props) => props.theme.spacing.xs};

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
    grid-template-rows: 1fr 1.25fr;
    grid-template-areas:
      'metronome timer exercises notes'
      'videoLooper videoLooper tuner tuner';
  }
`

const Container = styled.section<{ flex: boolean }>`
  display: ${(props) => (props.flex ? 'flex' : 'block')};
  align-items: center;
  justify-content: center;
`

const Centered = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 20vw;
`

const Home: NextPage = () => {
  const { data: session } = useSession()
  const { t } = useTranslation()
  const theme = useTheme()

  return (
    <Container flex={!session}>
      <Toaster
        toastOptions={{
          className: '',
          style: {
            color: theme.colors.text.primary,
            background: theme.colors.background,
            fontFamily: theme.typography.font.body,
          },
        }}
      />
      <Head>
        <title>Praksa - Home</title>
      </Head>

      {session ? (
        <HomepageGrid>
          <Metronome />
          <Timer />
          <ExerciseCard />
          <Notes />
          <VideoLooper />
          <Tuner />
        </HomepageGrid>
      ) : (
        <Centered>
          <PrimaryBtn
            text={t('auth.sign_in_google')}
            onClick={() => signIn('google')}
            isFluid
            lowercase
          >
            <FcGoogle />
          </PrimaryBtn>
        </Centered>
      )}
    </Container>
  )
}

export default Home
