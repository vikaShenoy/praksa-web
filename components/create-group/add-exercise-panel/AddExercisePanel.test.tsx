import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../../i18n/i18n'
import Theme from '../../Theme'
import AddExercisePanel from './AddExercisePanel'

describe('Add exercise panel', () => {
  let onSave: jest.Func
  let user: UserEvent

  function reset() {
    const props = { onSave }
    user = userEvent.setup()

    render(
      <I18nextProvider i18n={i18n}>
        <Theme>
          <AddExercisePanel {...props} />
        </Theme>
      </I18nextProvider>
    )
  }

  beforeEach(reset)

  describe('fields', () => {
    it('has a name field label', () => {
      expect(screen.queryByText('Exercise name')).toBeTruthy()
    })

    it('has a name field input', () => {
      expect(screen.queryByLabelText('Exercise name input')).toBeTruthy()
    })

    it('has a starting bpm label', () => {
      expect(screen.queryByText('Starting BPM')).toBeTruthy()
    })

    it('has a starting bpm input', () => {
      expect(screen.queryByLabelText('Starting BPM input')).toBeTruthy()
    })

    it('has a target bpm label', () => {
      expect(screen.queryByText('Target BPM')).toBeTruthy()
    })

    it('has a target bpm input', () => {
      expect(screen.queryByLabelText('Target BPM input')).toBeTruthy()
    })

    it('has a duration label', () => {
      expect(screen.queryByText('Duration (seconds)')).toBeTruthy()
    })

    it('has a duration input', () => {
      expect(screen.queryByLabelText('Duration input')).toBeTruthy()
    })
  })

  describe('submit', () => {
    it('has a save button', () => {
      expect(screen.queryByText('Save')).toBeTruthy()
    })

    it('save button is disabled by default', () => {
      const saveBtn = screen.getByText('Save')
      expect(saveBtn).toHaveStyle({ 'background-color': '#E0E0E01A' })
    })

    it('filling in the name field enables the save button', () => {
      userEvent.type(screen.getByLabelText('Exercise name input'), 'Tapping')
      const saveBtn = screen.getByText('Save')
      expect(saveBtn).toHaveStyle({ 'background-color': '#513097' })
    })

    it('filling in the name field and clicking save calls the save callback', () => {
      userEvent.type(screen.getByLabelText('Exercise name input'), 'Tapping')
      const saveBtn = screen.getByText('Save')
      userEvent.click(saveBtn)
      expect(onSave).toHaveBeenCalledWith({ exerciseName: 'Tapping' })
    })

    it('filling in all fields and clicking save calls the save callback', () => {
      userEvent.type(screen.getByLabelText('Exercise name input'), 'Tapping')
      userEvent.type(screen.getByLabelText('Starting BPM input'), '180')
      userEvent.type(screen.getByLabelText('Target BPM input'), '200')
      userEvent.type(screen.getByLabelText('Duration input'), '300')

      const saveBtn = screen.getByText('Save')
      userEvent.click(saveBtn)

      expect(onSave).toHaveBeenCalledWith({
        exerciseName: 'Tapping',
        startingBpm: 180,
        targetBpm: 180,
        duration: 300,
      })
    })
  })
})
