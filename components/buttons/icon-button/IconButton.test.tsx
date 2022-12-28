import { fireEvent, render, screen } from '@testing-library/react'
import { IoAdd } from 'react-icons/io5'
import Theme from '../../Theme'
import IconButton from './IconButton'

describe('Icon button component', () => {
  let onClick: jest.Func

  function reset() {
    onClick = jest.fn()

    render(
      <Theme>
        <IconButton iconName={IoAdd} onClick={onClick} />
      </Theme>
    )
  }

  describe('on mount', () => {
    beforeEach(reset)
    
    it('renders the icon button', () => {
      expect(screen.getByRole('button')).toBeDefined()
    })

    it('calls the on click callback when clicked', () => {
      const btn = screen.getByRole('button')
      fireEvent.click(btn)
      expect(onClick).toHaveBeenCalled()
    })
  })
})
