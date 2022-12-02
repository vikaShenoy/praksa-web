import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled, { useTheme } from 'styled-components'
import useMediaQuery from '../../hooks/useMediaQuery'
import { Card } from '../../styles/wrappers/components'
import { CenteredFlexRow } from '../../styles/wrappers/containers'
import { BodyText, BoldText } from '../../styles/wrappers/fonts'
import SecondaryBtn from '../buttons/secondary-btn/SecondaryBtn'

const NotesCard = styled(Card)<{ isMobile: boolean; spaceBetween: boolean }>`
  min-width: ${(props) => props.theme.sizes.components.minCardWidth};
  width: ${(props) => (props.isMobile ? '100%' : '25%')};
  gap: ${(props) => props.theme.spacing.lg};
  justify-content: flex-start;
`

const TextInput = styled.textarea`
  width: 90%;
  padding: ${(props) => props.theme.spacing.sm};
  background-color: ${(props) => props.theme.colors.disabled};
  resize: none;

  border: none;

  font-family: ${(props) => props.theme.typography.font.body};
  font-size: ${(props) => props.theme.typography.size.sm};
  color: ${(props) => props.theme.colors.text.primary};

  &:focus {
    outline: 2px solid ${(props) => props.theme.colors.accent};
  }
`

const NotesContainer = styled(BodyText)`
  width: 100%;
  text-align: left;
  white-space: pre;
  padding: ${(props) => props.theme.spacing.sm};
`

const BtnWrapper = styled.div`
  margin-top: auto;
`

const Notes = () => {
  const theme = useTheme()
  const { t } = useTranslation()
  const [isEditing, setIsEditing] = useState(false)
  const [notes, setNotes] = useState('')
  const notesInput = useRef<HTMLTextAreaElement>(null)
  let isMobile = useMediaQuery(theme.sizes.breakpoints.sm)

  const onSave = () => {
    if (
      notesInput &&
      notesInput.current &&
      notesInput.current.value.length > 0
    ) {
    }
    setNotes(notesInput.current!.value)
    setIsEditing(false)
  }

  return (
    <NotesCard
      isMobile={isMobile}
      spaceBetween={!isEditing && notes.length > 0}
    >
      <BoldText>{t('notes.title')}</BoldText>
      {isEditing && (
        <>
          <TextInput rows={8} ref={notesInput} defaultValue={notes} />
          <CenteredFlexRow gap={16}>
            <SecondaryBtn
              text={t('common.cancel')}
              onClick={() => setIsEditing(false)}
            />
            <SecondaryBtn text={t('common.save')} onClick={onSave} />
          </CenteredFlexRow>
        </>
      )}

      {!isEditing && notes.length === 0 && (
        <>
          <BodyText>{t('notes.prompt')}</BodyText>
          <BtnWrapper>
            <SecondaryBtn
              text={t('common.add')}
              onClick={() => setIsEditing(true)}
            />
          </BtnWrapper>
        </>
      )}

      {!isEditing && notes.length > 0 && (
        <>
          <NotesContainer>{notes}</NotesContainer>
          <BtnWrapper>
            <SecondaryBtn
              text={t('common.edit')}
              onClick={() => setIsEditing(true)}
            />
          </BtnWrapper>
        </>
      )}
    </NotesCard>
  )
}

export default Notes
