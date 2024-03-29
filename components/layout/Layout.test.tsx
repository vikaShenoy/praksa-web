import { render, screen } from '@testing-library/react'
import { SessionProvider } from 'next-auth/react'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../i18n/i18n'
import Theme from '../Theme'
import Layout from './Layout'

describe('Layout component', () => {
  beforeEach(() => {
    const session = { expires: '1' }
    render(
      <SessionProvider session={session}>
        <I18nextProvider i18n={i18n}>
          <Theme>
            <Layout>
              <button>Test button</button>
            </Layout>
          </Theme>
        </I18nextProvider>
      </SessionProvider>
    )
  })

  it('renders the navbar', () => {
    expect(screen.queryByRole('navigation')).toBeTruthy()
  })

  it('renders children', () => {
    expect(screen.queryByRole('button', { name: 'Test button' })).toBeTruthy()
  })
})
