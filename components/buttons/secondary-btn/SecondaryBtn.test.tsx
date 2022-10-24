import { fireEvent, render, screen } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../../i18n/i18n'
import Theme from '../../Theme'
import SecondaryBtn from './SecondaryBtn'

describe('Secondary button', () => {
  const onClick = jest.fn()
  const text = 'Add'

  function reset() {
    const props = { text, onClick }
    render(
      <I18nextProvider i18n={i18n}>
        <Theme>
          <SecondaryBtn {...props} />
        </Theme>
      </I18nextProvider>
    )
  }

  describe('on load', () => {
    beforeEach(reset)

    it('renders with the provided text', () => {
      expect(screen.queryByText(text)).toBeTruthy()
    })

    it('clicking the button calls the onClick callback', () => {
      const btn = screen.getByText(text)
      fireEvent.click(btn)
      expect(onClick).toHaveBeenCalled()
    })
  })
})
