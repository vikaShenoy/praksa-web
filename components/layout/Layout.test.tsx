import { render, screen } from '@testing-library/react'
import Theme from '../Theme'
import Layout from './Layout'

// TODO
describe('Layout component', () => {
  beforeEach(() => {
    render(
      <Theme>
        <Layout>
          <button>Test button</button>
        </Layout>
      </Theme>
    )
  })

  it('renders the navbar', () => {
    expect(screen.queryByRole('navigation')).toBeTruthy()
  })

  it('renders children', () => {
    expect(screen.queryByRole('button', { name: 'Test button' })).toBeTruthy()
  })
})
