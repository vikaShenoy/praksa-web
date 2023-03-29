import { render, screen } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../../i18n/i18n'
import Theme from '../../Theme'
import { clickEl } from '../test-utils/testUtils'
import BasicModal from './BasicModal'

describe('Basic modal component', () => {
  let onConfirm: jest.Func
  let onCancel: jest.Func

  function reset(isOpen = true) {
    const title = 'Delete exercise'
    const subtitle =
      'Are you sure you want to delete the exercise: Downpicking?'
    onConfirm = jest.fn()
    onCancel = jest.fn()

    const props = {
      isOpen,
      title,
      subtitle,
      onConfirm,
      onCancel,
      ariaHide: true,
    }

    render(
      <I18nextProvider i18n={i18n}>
        <Theme>
          <BasicModal {...props} />
        </Theme>
      </I18nextProvider>
    )
  }

  describe('on load', () => {
    it('renders the title', () => {
      reset()
      expect(screen.getByText('Delete exercise')).toBeDefined()
    })

    it('renders the subtitle', () => {
      reset()
      expect(
        screen.getByText(
          'Are you sure you want to delete the exercise: Downpicking?'
        )
      ).toBeDefined()
    })

    it('closes the modal when the isOpen prop changes to false', () => {
      reset(false)
      expect(screen.queryByText('Delete exercise')).toBeFalsy()
    })
  })

  describe('buttons', () => {
    beforeEach(reset)

    it('calls the cancel callback on cancel button click', () => {
      const cancelBtn = screen.getByText('Cancel')
      clickEl(cancelBtn)
      expect(onCancel).toHaveBeenCalled()
    })

    it('calls the confirm callback on confirm button click', () => {
      const confirmBtn = screen.getByText('Confirm')
      clickEl(confirmBtn)
      expect(onConfirm).toHaveBeenCalled()
    })
  })
})
