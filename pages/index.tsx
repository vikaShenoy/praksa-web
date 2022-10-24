import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import Metronome from '../components/metronome/Metronome'
import Timer from '../components/timer/Timer'
import ViewGroups from '../components/view-groups/ViewGroups'
import GroupContext from '../contexts/GroupContext'
import { Flex } from '../styles/wrappers'

const Home: NextPage = () => {
  const [showViewGroups, setShowViewGroups] = useState(false)
  const [showCreateGroup, setShowCreateGroup] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null)

  return (
    <section>
      <Head>
        <title>Praksa - Home</title>
      </Head>
      <Flex>
        <GroupContext.Provider
          value={{
            showViewGroups,
            setShowViewGroups,
            showCreateGroup,
            setShowCreateGroup,
            selectedGroup,
            setSelectedGroup,
          }}
        >
          <Metronome />
          <Timer />
          <ViewGroups groups={[]} />
        </GroupContext.Provider>
      </Flex>
    </section>
  )
}

export default Home
