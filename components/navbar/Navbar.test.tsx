import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../i18n/i18n'
import Theme from '../Theme'
import Navbar from './Navbar'

describe('Navbar', () => {
  jest.mock(
    'next/link',
    () =>
      ({ children }: { children: React.ReactNode }) =>
        children
  )

  beforeEach(() => {
    render(
      <I18nextProvider i18n={i18n}>
        <Theme>
          <Navbar />
        </Theme>
      </I18nextProvider>
    )
  })

  it('renders the title', () => {
    const title = screen.getByText('Praksa')
    expect(title).toBeInTheDocument()
  })

  it('renders a home link', () => {
    const homeLink = screen.getByText('Home')
    expect(homeLink).toBeInTheDocument()
  })

  it('renders an about link', () => {
    const aboutLink = screen.getByText('About')
    expect(aboutLink).toBeInTheDocument()
  })

  it('does not render the hamburger icon when the screen is wide', () => {
    const menuIcon = screen.queryByTestId('menu-icon')
    expect(menuIcon).not.toBeInTheDocument()
  })

  it('does not render the logout button when the user is not authenticated', () => {
    const logout = screen.queryByText('Log out')
    expect(logout).toBeFalsy()
  })

  // TODO: Figure out how to mock auth

  // it('renders a logout button when the user is authenticated', () => {
  //   const logout = screen.queryByText('Log out')
  //   expect(logout).toBeTruthy()
  // })

  // it('renders the users name when authenticated', () => {
  //   const userText = screen.queryByText('Hello, Russell Westbrook!')
  //   expect(userText).toBeTruthy()
  // })
})
