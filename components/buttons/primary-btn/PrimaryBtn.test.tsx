import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../../i18n/i18n'
import Theme from '../../Theme'
import PrimaryBtn from './PrimaryBtn'

describe('Primary button', () => {
  let onClick: jest.Func
  const text = 'Save'

  function reset(disabled: boolean = false) {
    onClick = jest.fn()
    const props = { text, onClick, disabled }

    render(
      <I18nextProvider i18n={i18n}>
        <Theme>
          <PrimaryBtn {...props} />
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

    it('has the secondary color as a background color when not disabled', () => {
      const btn = screen.getByRole('button')
      expect(btn).toHaveStyle({ 'background-color': '#513097'})
    })
  })

  describe('disabled', () => {
    beforeEach(() => reset(true))

    it('has the disabled background color when disabled', () => {
      const btn = screen.getByRole('button')
      expect(btn).toHaveStyle({ 'background-color': '#E0E0E01A'})
    })

    it('cannot be clicked when disabled', () => {
      const btn = screen.getByRole("button")
      fireEvent.click(btn)
      expect(onClick).not.toHaveBeenCalled()
    })
  })
})
