import { render, screen } from '@testing-library/react'
import { Wrappers } from '../utils/wrappers'
import { ExerciseLoadingError } from './ExerciseLoadingError'

describe('ExerciseLoadingError component', () => {
  function reset() {
    render(
      <Wrappers>
        <ExerciseLoadingError />
      </Wrappers>
    )
  }

  describe('on mount', () => {
    beforeEach(reset)

    it('renders error text', () => {
      expect(
        screen.getByText(
          'There was an error loading your exercises. Please try again later.'
        )
      )
    })

    it('renders error icon', () => {
      expect(screen.getByRole('img')).toBeDefined()
    })
  })
})
