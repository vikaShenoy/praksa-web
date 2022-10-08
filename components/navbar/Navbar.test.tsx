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

  it('does not show the hamburger icon when the screen is wide', () => {
    const menuIcon = screen.queryByTestId('menu-icon')
    expect(menuIcon).not.toBeInTheDocument()
  })
})
