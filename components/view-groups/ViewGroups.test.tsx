import { fireEvent, render, screen } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import GroupContext, {
  defaultGroupContextValue,
} from '../../contexts/GroupContext'
import i18n from '../../i18n/i18n'
import { mockGroups } from '../../mocks/mockGroups'
import { ExerciseGroup } from '../../models/ExerciseGroup'
import Theme from '../Theme'
import ViewGroups from './ViewGroups'

describe('View groups', () => {
  const setShowCreateGroup = jest.fn()

  function reset(groups: ExerciseGroup[] = mockGroups) {
    const props = { groups }
    render(
      <I18nextProvider i18n={i18n}>
        <Theme>
          <GroupContext.Provider
            value={{ ...defaultGroupContextValue, setShowCreateGroup }}
          >
            <ViewGroups {...props} />
          </GroupContext.Provider>
        </Theme>
      </I18nextProvider>
    )
  }

  describe('on mount', () => {
    beforeEach(reset)

    it('renders a title', () => {
      expect(screen.queryByText('Groups')).toBeTruthy()
    })
  })

  describe('no groups', () => {
    beforeEach(() => reset([]))

    it('renders text to prompt the user to create a group', () => {
      expect(screen.queryByText('Create a group to get started!')).toBeTruthy()
    })

    it('renders a create button', () => {
      expect(screen.queryByText('Create')).toBeTruthy()
    })

    it('create button calls the showCreateGroup method in the group context', () => {
      const createBtn = screen.getByText('Create')
      fireEvent.click(createBtn)
      expect(setShowCreateGroup).toHaveBeenLastCalledWith(true)
    })
  })

  describe('view groups', () => {
    beforeEach(reset)

    it('displays a card for each group', () => {
      expect(screen.queryAllByLabelText('Exercise group tile').length).toBe(2)
    })
  })
})
