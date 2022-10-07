import React from 'react'
import styled from 'styled-components'
import Navbar from '../navbar/Navbar'
import Theme from '../Theme'

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.colors.background};
`

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Theme>
      <Background>
        <Navbar />
        {children}
      </Background>
    </Theme>
  )
}

export default Layout
