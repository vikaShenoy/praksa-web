import { fireEvent, render, screen } from '@testing-library/react'
import { IoAddSharp } from 'react-icons/io5'
import Theme from '../../Theme'
import CircleIconButton, { ButtonSize } from './CircleIconButton'

describe('Circle icon button component', () => {
  let onClick: jest.Func

  function reset(size: ButtonSize = ButtonSize.LARGE) {
    onClick = jest.fn()
    const props = {
      iconName: IoAddSharp,
      onClick,
      size,
      ariaLabel: 'Add button',
    }
    render(
      <Theme>
        <CircleIconButton {...props} />
      </Theme>
    )
  }

  describe('on load', () => {
    it('renders the button', () => {
      reset()
      expect(screen.getByRole('button')).toBeDefined()
    })

    it('calls the on click callback when clicked', () => {
      reset()
      const btn = screen.getByRole('button')
      fireEvent.click(btn)
      expect(onClick).toHaveBeenCalled()
    })

    it('button is 64px big when the size is large', () => {
      reset()
      const btn = screen.getByRole('button')
      expect(btn).toHaveStyle('height: 64px')
    })

    it('button is 32px big when the size is small', () => {
      reset(ButtonSize.SMALL)
      const btn = screen.getByRole('button')
      expect(btn).toHaveStyle('height: 32px')
    })
  })
})
