import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import GroupContext, {
  defaultGroupContextValue,
} from '../../contexts/GroupContext'
import i18n from '../../i18n/i18n'
import { mockGroups } from '../../mocks/mockGroups'
import Theme from '../Theme'
import GroupTile from './GroupTile'

describe('Group tile', () => {
  const mockSelectGroupFn = jest.fn()

  function reset(isSelected = false) {
    const group = mockGroups[0]
    const props = { group, isSelected }
    render(
      <I18nextProvider i18n={i18n}>
        <Theme>
          <GroupContext.Provider
            value={{
              ...defaultGroupContextValue,
              setSelectedGroup: mockSelectGroupFn,
            }}
          >
            <GroupTile {...props} />
          </GroupContext.Provider>
        </Theme>
      </I18nextProvider>
    )
  }

  describe('on mount', () => {
    it('renders the name of the exercise group', () => {
      reset()
      expect(screen.queryByText('Lead guitar')).toBeTruthy()
    })

    it('renders the number of exercises in the group', () => {
      reset()
      expect(screen.queryByText('3 exercises')).toBeTruthy()
    })

    it('renders the background color as disable when the group is not selected', () => {
      reset()
      const container = screen.getByLabelText('Exercise group tile')
      expect(container).toHaveStyle({ 'background-color': '#E0E0E01A' })
    })

    it('renders the background color as gold when the group is selected', () => {
      reset(true)
      const container = screen.getByLabelText('Exercise group tile')
      expect(container).toHaveStyle({ 'background-color': '#87693B' })
    })

    it('selects the group on click', () => {
      reset()
      const container = screen.getByLabelText('Exercise group tile')
      fireEvent.click(container)
      expect(mockSelectGroupFn).toHaveBeenCalledWith('1')
    })
  })
})
