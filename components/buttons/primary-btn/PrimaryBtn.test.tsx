import { fireEvent, render, screen } from '@testing-library/react'
import Theme from '../../Theme'
import PrimaryBtn from './PrimaryBtn'

describe('Primary button component', () => {
  let onClick: jest.Func

  function reset(isFluid = false, disabled = false) {
    const text = 'Play'
    onClick = jest.fn()
    const props = {
      onClick,
      isFluid,
      text,
      disabled,
      isSubmitBtn: false,
    }

    render(
      <Theme>
        <PrimaryBtn {...props} />
      </Theme>
    )
  }

  describe('on load', () => {
    it('renders the button', () => {
      reset()
      expect(screen.getByRole('button')).toBeDefined()
    })

    it('renders the button text', () => {
      reset()
      expect(screen.getByText('Play')).toBeDefined()
    })

    it('calls the on click callback when clicked', () => {
      reset()
      const btn = screen.getByRole('button')
      fireEvent.click(btn)
      expect(onClick).toHaveBeenCalled()
    })

    it('cannot be clicked when the disabled prop is passed', () => {
      reset(false, true)
      const btn = screen.getByRole('button')
      fireEvent.click(btn)
      expect(onClick).not.toHaveBeenCalled()
    })

    it('has a width of 140px when isFluid is false', () => {
      reset(false)
      const btn = screen.getByRole('button')
      expect(btn).toHaveStyle('width: 140px')
    })

    it('has a width of auto when isFluid is true', () => {
      reset(true)
      const btn = screen.getByRole('button')
      expect(btn).toHaveStyle('width: auto')
    })
  })
})
