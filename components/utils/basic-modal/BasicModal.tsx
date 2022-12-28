import { t } from 'i18next'
import Modal from 'react-modal'
import styled from 'styled-components'
import { BodyText, BoldText } from '../../../styles/wrappers/fonts'
import PrimaryBtn from '../../buttons/primary-btn/PrimaryBtn'

const modalStyles = {
  content: {
    top: '50%',
    right: '50%',
    left: '50%',
    bottom: '50',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: 'fit-content',
    padding: '0',
    borderRadius: '1.5rem',
  },
}

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;

  background-color: ${(props) => props.theme.colors.background};
`

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 1rem;
  justify-content: center;
`

const MarginWrapper = styled.div<{ value: number }>`
  margin-top: ${(props) => props.value}px;
`

interface BasicModalProps {
  isOpen: boolean
  title: string
  subtitle: string
  onCancel: () => void
  onConfirm: () => void
}

const BasicModal: React.FC<BasicModalProps> = ({
  isOpen,
  title,
  subtitle,
  onCancel,
  onConfirm,
}) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onCancel} style={modalStyles}>
      <ModalContent>
        <BoldText>{title}</BoldText>
        <MarginWrapper value={16}>
          <BodyText>{subtitle}</BodyText>
        </MarginWrapper>

        <MarginWrapper value={100}>
          <ButtonContainer>
            <PrimaryBtn text={t('common.cancel')} onClick={onCancel} isFluid />
            <PrimaryBtn
              text={t('common.confirm')}
              onClick={onConfirm}
              isFluid
            />
          </ButtonContainer>
        </MarginWrapper>
      </ModalContent>
    </Modal>
  )
}

export default BasicModal
