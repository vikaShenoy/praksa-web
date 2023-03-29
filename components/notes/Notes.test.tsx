import { fireEvent, render, screen } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../i18n/i18n'
import Theme from '../Theme'
import { inputText } from '../utils/test-utils/testUtils'
import Notes from './Notes'

describe('Notes component', () => {
  function reset() {
    render(
      <I18nextProvider i18n={i18n}>
        <Theme>
          <Notes />
        </Theme>
      </I18nextProvider>
    )
  }
  beforeEach(reset)

  describe('on load', () => {
    it('renders the correct title', () => {
      expect(screen.getByText('Notes')).toBeDefined()
    })

    it('renders an add button', () => {
      expect(screen.getByText('Add')).toBeDefined()
    })

    it('shows the no notes placeholder by default', () => {
      expect(
        screen.getByText('Add notes on your practice routine!')
      ).toBeDefined()
    })
  })

  describe('edit mode', () => {
    beforeEach(() => {
      const addBtn = screen.getByText('Add')
      fireEvent.click(addBtn)
    })

    it('shows a text area in edit mode', () => {
      expect(screen.getByRole('textbox')).toBeDefined()
    })

    it('shows a save button in edit mode', () => {
      expect(screen.getByText('Save')).toBeDefined()
    })

    it('shows a cancel button in edit mode', () => {
      expect(screen.getByText('Cancel')).toBeDefined()
    })
  })

  describe('cancel editing', () => {
    beforeEach(() => {
      const addBtn = screen.getByText('Add')
      fireEvent.click(addBtn)
    })

    it('clicking the cancel button goes back to view mode', () => {
      const cancelBtn = screen.getByText('Cancel')
      fireEvent.click(cancelBtn)
      expect(screen.queryByRole('textbox')).toBeFalsy()
    })

    it('clicking the cancel button does not save the typed text', () => {
      const cancelBtn = screen.getByText('Cancel')
      fireEvent.click(cancelBtn)
      expect(
        screen.getByText('Add notes on your practice routine!')
      ).toBeDefined()
    })
  })

  describe('save editing', () => {
    beforeEach(() => {
      const addBtn = screen.getByText('Add')
      fireEvent.click(addBtn)
    })

    it('clicking the save button goes back to view mode', () => {
      const saveBtn = screen.getByText('Save')
      fireEvent.click(saveBtn)
      expect(screen.queryByRole('textbox')).toBeFalsy()
    })

    it('clicking the save button saves the typed text', () => {
      const textbox = screen.getByRole('textbox')
      inputText(textbox, 'Practice notes')
      const saveBtn = screen.getByText('Save')
      fireEvent.click(saveBtn)
      expect(screen.getByText('Practice notes')).toBeDefined()
    })

    it('button text is edit when there are notes', () => {
      const textbox = screen.getByRole('textbox')
      inputText(textbox, 'Practice notes')
      const saveBtn = screen.getByText('Save')
      fireEvent.click(saveBtn)
      expect(screen.getByText('Edit')).toBeDefined()
    })
  })
})
