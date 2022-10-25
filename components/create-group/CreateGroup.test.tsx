import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from "@testing-library/react"
import { I18nextProvider } from "react-i18next"
import i18n from "../../i18n/i18n"
import Theme from "../Theme"
import CreateGroup from "./CreateGroup"

describe('Create group', () => {
  let onCancel: jest.Func
  let onSave: jest.Func

  function reset() {
    onCancel = jest.fn()
    onSave = jest.fn()
    const props = { onCancel, onSave }
    render(
      <I18nextProvider i18n={i18n}>
        <Theme>
          <CreateGroup {...props} />
        </Theme>
      </I18nextProvider>
    )
  }

  beforeEach(reset)

  describe('on mount', () => {
    it('has a title', () => {
      expect(screen.queryByText('Create Group')).toBeTruthy()
    })
  })

  describe('basic form', () => {
    it('has a name field label', () => {
      expect(screen.queryByText('Name')).toBeTruthy()
    })

    it('has a name field input', () => {
      expect(screen.queryByRole('textbox')).toBeTruthy()
    })

    it('has an exercises label', () => {
      expect(screen.queryByText('Exercises')).toBeTruthy()
    })

    it('has exercises placeholder text', () => {
      expect(screen.queryByText('Add an exercise to your group!')).toBeTruthy()
    })

    it('clicking the add button shows the exercise drawer', () => {
      const addBtn = screen.getByText('Add')
      fireEvent.click(addBtn)
      expect(screen.queryByText('Starting BPM')).toBeTruthy()
    })
  })

  describe('buttons', () => {
    it('has a cancel button', () => {
      expect(screen.queryByText('Cancel')).toBeTruthy()
    })

    it('clicking the cancel button calls the cancel callback', () => {
      const cancelBtn = screen.getByText('Cancel')
      fireEvent.click(cancelBtn)
      expect(onCancel).toHaveBeenCalled()
    })

    it('has a save button', () => {
      expect(screen.queryByText('Save')).toBeTruthy()
    })

    it('the save button is disabled by default', () => {
      const saveBtn = screen.getByText('Save')
      expect(saveBtn).toHaveStyle({ 'background-color': '#E0E0E01A'})
    })
  })

  describe('submitting the form', () => {
    // TODO

    // Add one exercise, click save, exercise is added as a tile

    // Fill in title and one exercise, save button becomes enabled

    // Fill in the fields, click save (do twice), click save, onSave callback is called
  })
})