import { render, screen } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../i18n/i18n'
import Theme from '../Theme'
import Tuner from './Tuner'

describe('Tuner component', () => {
  function reset() {
    render(
      <I18nextProvider i18n={i18n}>
        <Theme>
          <Tuner />
        </Theme>
      </I18nextProvider>
    )
  }

  beforeEach(reset)

  describe('on load', () => {
    it('renders the title', () => {
      expect(screen.getByText('Tuner (coming soon)')).toBeDefined()
    })
  })
})
