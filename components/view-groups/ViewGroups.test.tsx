import { render, screen } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../i18n/i18n'
import { ExerciseGroup } from '../../models/ExerciseGroup'
import Theme from '../Theme'
import ViewGroups from './ViewGroups'

describe('View groups', () => {
  function reset() {
    const groups: ExerciseGroup[] = []

    const props = { groups }
    render(
      <I18nextProvider i18n={i18n}>
        <Theme>
          <ViewGroups {...props} />
        </Theme>
      </I18nextProvider>
    )
  }

  describe('on mount', () => {
    beforeEach(reset)

    it('renders', () => {
      expect(screen.queryByText('View Groups!')).not.toBeTruthy()
    })
  })
})
