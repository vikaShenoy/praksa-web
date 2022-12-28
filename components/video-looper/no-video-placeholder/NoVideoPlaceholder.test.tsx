import { render, screen } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../../i18n/i18n'
import Theme from '../../Theme'
import NoVideoPlaceholder from './NoVideoPlaceholder'

describe('No video placeholder component', () => {
  function reset() {
    render(
      <I18nextProvider i18n={i18n}>
        <Theme>
          <NoVideoPlaceholder />
        </Theme>
      </I18nextProvider>
    )
  }

  describe('on load', () => {
    beforeEach(reset)

    it('renders the correct placeholder text', () => {
      expect(
        screen.getByText('Load a video from YouTube using the searchbox below')
      ).toBeDefined()
    })
  })
})
