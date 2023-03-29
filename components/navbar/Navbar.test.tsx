import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../i18n/i18n'
import Theme from '../Theme'
import Navbar from './Navbar'

jest.mock(
  'next/link',
  () =>
    ({ children }: { children: React.ReactNode }) =>
      children
)

describe('Navbar', () => {
  function reset(loggedIn: boolean = true) {
    const session = {
      expires: '1',
      status: loggedIn ? 'authenticated' : 'unauthenticated ',
      user: { name: 'Russell Westbrook' },
    }

    render(
      <SessionProvider session={session}>
        <I18nextProvider i18n={i18n}>
          <Theme>
            <Navbar />
          </Theme>
        </I18nextProvider>
      </SessionProvider>
    )
  }

  describe('on render', () => {
    beforeEach(reset)

    it('renders the title', () => {
      const title = screen.getByText('Praksa')
      expect(title).toBeInTheDocument()
    })

    it('does not render the hamburger icon when the screen is wide', () => {
      const menuIcon = screen.queryByTestId('menu-icon')
      expect(menuIcon).not.toBeInTheDocument()
    })

    it('does not render the logout button when the user is not authenticated', () => {
      const logout = screen.queryByText('Log out')
      expect(logout).toBeFalsy()
    })
  })

  describe('auth', () => {
    it('renders a logout button when the user is authenticated', () => {
      reset(true)
      const logout = screen.queryByText('Logout')
      expect(logout).toBeTruthy()
    })

    it('renders the users name when authenticated', () => {
      reset(false)
      const userText = screen.queryByText('Hello, Russell Westbrook!')
      expect(userText).toBeTruthy()
    })
  })
})
